const db = require('../models/index')
// const userModel = require('../models/user.model');
// const stripeModel = require('../models/stripe.model')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const queryString = require('query-string')
// const logsModel = require('../models/log.model');
// const log = require('../libs/log');

//first make sure that a user, who adds a credit card, is already enrolled on your platform as a customer.
// async function addCard(req, res) {
//   //{ user, body: { cardToken } }
//   console.log(req.params, req.body);
//   const user = req.body.user
//   const cardToken = req.body
//   if (!user.stripeCustomerId) {
//     const stripeCustomerId = await createCustomer(user.email);
//     await User.findOneAndUpdate(
//       { _id: user._id },
//       { $set: { stripeCustomerId } },
//     );
//     return addCustomerCard(stripeCustomerId, cardToken);
//   }
//   return addCustomerCard(user.stripeCustomerId, cardToken);
// };

// async function getCards(req, res) {
//   console.log(req.params, req.body);
//   const user = req.body
//   if (!user.stripeCustomerId) return [];
//   return listCustomerCards(user.stripeCustomerId);
// };


// async function connectAccount(req, res) {
//   console.log(req.params, req.body);
//   const user = req.body.user
//   const authorizationCode = req.body
//   const { data: { stripe_user_id } } = await createConnectedAccount(authorizationCode);
//   await User.findOneAndUpdate(
//     { _id: user._id },
//     { $set: { stripeAccountId: stripe_user_id } },
//   );
//   return { stripeAccountId: stripe_user_id };
// };

async function createConnectAccount(req, res, next) {
  console.log('********************* StripeController - createConnectAccount****************', req.user.toJSON());
  try {
    //how to call user.controller to update the user instead of doing it from here? - need userID and stripeAccountID
    // there is no difference between using await with exec() or without it. 
    // does exactlythe same, but you get a better stack trace if any error happened
    // const user = await db.User.findById(req.user._id)
    const user = req.user
    console.log('###### Found User with email:=====>', user.email)
    if (!user.stripe_account_id) {
      // const stripeAccount = await { id: 'acct_1JIuU8PEukROeAWK' }
      const stripeAccount = await stripe.accounts.create({
        country: 'DK',
        type: "express",
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true }
        }
      })
      if (stripeAccount.id) {
        console.log('<<<<  ready to update >>>> User ', user.id, ' >>>> with <<<< ', stripeAccount.id, '>>>>');
        user.stripe_account_id = stripeAccount.id

        //updating User table
        const userUpdateResult = await db.User.update(
          { stripe_account_id: stripeAccount.id },
          {
            where: { id: user.id }
          })
        console.log('updated', userUpdateResult)
        user.stripe_account_id ? response = 'ok' : ''
        console.log('###### User updated with', user.stripe_account_id, '====>', response)

        //updating Stripe Table
        console.log('<<<<  ready to update >>>>  StripeData ', user.id, '>>>> with <<<< ', stripeAccount.id, '>>>>');
        const stripeUpdateResult = await db.StripeData.create(
          {
            stripe_account_id: stripeAccount.id,
            stripe_user_id: user.id
          })
        db.StripeData.stripe_account_id ? response = 'ok' : ''
        console.log('###### StripeData updated with', stripeUpdateResult.stripe_account_id, 'and user', stripeUpdateResult.stripe_user_id, '====>', response)
      }
    } else {
      console.log('ERR ---> Stripe Account Already Created')
      return res.status(401).send('ERR ---> Stripe Account Already Created')
    }
    //calling strip onboarding link creation 
    console.log('###### createStripeAccountLink');
    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: process.env.STRIPE_REDIRECT_URL,
      return_url: process.env.STRIPE_REDIRECT_URL,
      type: 'account_onboarding',
    })
    //assigning additional data to prefill onboarding form
    accountLink = Object.assign(accountLink, {
      "stripe_user[email]": user.email || undefined,
      "stripe_user[country]": user.country || undefined
    })

    // console.log(`### stripe onboarding link: ========> ${accountLink.url}?${queryString.stringify(accountLink)}`)
    let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
    // let link = `${JSON.stringify(accountLink.url)}?${JSON.stringify(accountLink)}`;
    console.log('###### stripe onboarding accountLink =========>>/n', link);
    res.status(201).send(link);
    // res.send(link);
  } catch (err) {
    let errmsg = ''
    if (err.raw && err.raw.message) {
      console.log('>>>>', err.raw.statusCode, ':', err.raw.message)
      //unable to log all fields - why??
      log({
        file: 'stripe.controller.js',
        line: '104',
        info: err,
        code: err.raw.code,
        message: err.raw.message,
        type: err.raw.type,
        status_code: err.raw.statusCode
      }, logsModel);
      errmsg = err.raw.message
    } else {
      console.log(err)
    }
    res.status(500).send(errmsg || err);
  }
}

async function createSessionId(req, res, next) {
  console.log('createSessionId', req.body);

  let amount = req.body.amount;
  let stripeUserId = req.body.stripeUserId;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          product_data: {
            name: 'games'
          },
          unit_amount: amount,
          currency: 'dkk'
        },
        quantity: 1
      }],
      mode: 'payment',
      payment_intent_data: {
        transfer_data: {
          destination: stripeUserId
        },
      },
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel'
    });
    let sessionId = session.id;
    console.log({ sessionId: sessionId })
    res.status(200).json({ sessionId: sessionId })
  } catch (err) {
    err.raw.message ? errmsg = err.raw.message : errmsg = err
    console.log('500:', errmsg, err.raw.code);
    //unable to log all fields - why??
    log({
      file: 'stripe.controller.js',
      line: '139',
      user: stripeUserId,
      info: errmsg,
      code: err.raw.code,
      type: err.type,
      status_code: err.statusCode
    }, logsModel);
    res.status(500).send(errmsg);
  }
}
// next(console.log('next here'))

const updateDelayDaysAPI = async (accountId) => {
  const account = await stripe.accounts.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: process.env.STRIPE_DELAY_DAYS,
        },
      },
    },
  });
  return account;
};

const getAccountStatus = async (req, res) => {
  console.log('********************* StripeController - getAccountStatus ****************', req.user.toJSON());
  // const user = await db.User.findOne({ where: { email: email } });
  const user = req.user
  try {
    const account = await updateDelayDaysAPI(user.stripe_account_id);
    // console.log("USER ACCOUNT UPDATED with 7 days payout >>>>>>>>>>>>>>>>>>>>>>", updatedAccount);
    // const account = await stripe.accounts.retrieve(user.stripe_account_id);
    console.log("USER ACCOUNT Updated and RETRIEVED >>>>>>>>>>>>>>>>>>>>>>", account);
    // update delay days
    // const userUpdateResult = await db.User.update(
    //   { stripe_account_id: stripeAccount.id },
    //   {
    //     where: { id: user.id }
    //   })
    console.log(typeof account.charges_enabled);

    const updatedStripeData = await db.StripeData.update(
      {
        charges_enabled: account.charges_enabled,
        details_submitted: account.details_submitted,
        payouts_enabled: account.payouts_enabled,
        default_currency: account.default_currency,
        country: account.country,
        payout_schedule: account.payout_schedule.delay_days,
        capabilities_card_payments: account.capabilities.card_payments,
        capabilities_platform_payments: account.capabilities.platform_payments,
        fields_needed: account.verification.fields_needed
      },
      {
        where: { stripe_account_id: user.stripe_account_id }
      })
    console.log('updatedStripeData', account);
    //how to pass the obj to the client
    res.status(200).send({ account });
    // res.send(Buffer.from(updatedStripeData))
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};

const getAccountBalance = async (req, res) => {
  const user = req.user
  // const user = await userModel.findById(req.user._id)
  if (!user) return null;
  try {
    const balance = await stripe.balance.retrieve({
      stripe_account: user.stripe_account_id, //stripeAccount
    });
    //   .then(({ pending }) => (
    // {
    //   pending: pending[0].amount,
    // }

    console.log("BALANCE ===>", balance);
    // res.send(balance)
    res.json({ available: balance.available, pending: balance.pending});
  } catch (err) {
    console.log(err);
  }
};

//is additional validation necessary if e.g. we want to transfer the payments?
const payoutSetting = async (req, res) => {
  try {
    const user = req.user
    // const user = await userModel.findById(req.user._id).exec();
    const loginLink = await stripe.accounts.createLoginLink(
      user.stripe_account_id,
      {
        redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
      }
    );
    console.log("LOGIN LINK FOR PAYOUT SETTING", loginLink);
    res.json(loginLink);
  } catch (err) {
    // console.log("STRIPE PAYOUT SETTING ERR ", err);
    console.log("STRIPE PAYOUT SETTING ERR ", err.raw.message);
    err.raw.message ? res.status(500).send(err.raw.message) : err
  }
};

module.exports = { createConnectAccount, createSessionId, getAccountStatus, getAccountBalance, payoutSetting }
