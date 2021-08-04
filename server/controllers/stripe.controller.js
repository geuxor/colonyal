const db = require('../models/index')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const queryString = require('query-string')

async function createConnectAccount(req, res, next) {
  console.log('********************* StripeController - createConnectAccount****************', req.user.toJSON());
  try {
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

        //updating Stripe Table
        console.log('<<<<  ready to update >>>>  StripeData ', user.id, '>>>> with <<<< ', stripeAccount.id, '>>>>');
        const stripeUpdateResult = await db.StripeData.create(
          {
            stripe_account_id: stripeAccount.id,
            stripe_user_id: user.id
          })
        await stripeUpdateResult.setUser(user.id)

        console.log('stripeUpdateResult done');
        db.StripeData.stripe_account_id ? stripeUpdateResult.res = 'ok' : ''
        console.log('###### StripeData updated with', stripeUpdateResult.stripe_account_id, 'and user', stripeUpdateResult.stripe_user_id, '====>', res)
      }
      // } else {
      //   console.log('ERR ---> Stripe Account Already Created')
      //   return res.status(401).send('ERR ---> Stripe Account Already Created')
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

    let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
    console.log('###### stripe onboarding accountLink =========>>/n', link);
    res.status(201).send(link);
  } catch (err) {
    let errmsg = ''
    if (err.raw && err.raw.message) {
      console.log('>>>>', err.raw.statusCode, ':', err.raw.message)
      //create a log for this error in db
      errmsg = err.raw.message
    } else {
      console.log(err)
    }
    res.status(500).send(errmsg || err);
  }
}

async function createSessionId(req, res, next) {
  console.log('createSessionId - buying productId: ', req.body.id);
  const user = req.user
  //get prod id from req.body
  //find product based on id from db
  const product = req.body
  const fee = (product.price * process.env.STRIPE_PLATFORM_FEE) / 100
  console.log('fee:', fee)
  // createa a session
  try {
    console.log('yea, found a user for this product:', user.stripe_account_id);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      //purchasing items details, it will be shown to user on checkout
      line_items: [{
        price_data: {
          product_data: {
            name: product.title
          },
          unit_amount: product.price * 100,
          currency: 'dkk'
        },
        quantity: 1
      }],
      mode: 'payment',
      //create payment intent with app fee and destinaiton charge
      payment_intent_data: {
        application_fee_amount: fee * 100,
        //seller can see his balance in dashboard
        transfer_data: {
          destination: user.stripe_account_id
        },
      },
      success_url: `${process.env.STRIPE_SUCCESS_URL}/${product.id}`,
      cancel_url: process.env.STRIPE_FAILURE_URL
    });

    // add session objecto to user in the db
    const updatedStripeSessionId = await db.User.update({ stripe_session_id: session.id },
      {
        where: { id: user.id },
        plain: true
      })
    console.log('User with id:', user.id, ' updated stripe_session_id: ', updatedStripeSessionId)

    // send session id to client to finalize payment
    res.status(200).json({ sessionId: session.id, product: product })
  } catch (err) {
    err.raw.message ? errmsg = err.raw.message : errmsg = err
    console.log('500:', errmsg, err.raw.code);
    //log all fields
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
  const user = req.user
  if (!user.stripe_account_id) {
    console.log('No Stripe account found');
    return res.status(200).send('No Stripe account found');
  }
  try {
    const account = await updateDelayDaysAPI(user.stripe_account_id);
    // console.log("USER ACCOUNT UPDATED with 7 days payout >>>>>>>>>>>>>>>>>>>>>>", updatedAccount);
    // const account = await stripe.accounts.retrieve(user.stripe_account_id);
    console.log("getAccountStatus: USER ACCOUNT Updated and RETRIEVED >>>>>>>>>>>>>>>>>>>>>>", account);
    // update delay days
    // const userUpdateResult = await db.User.update(
    //   { stripe_account_id: stripeAccount.id },
    //   {
    //     where: { id: user.id }
    //   })
    // console.log(typeof account.charges_enabled);
    // const { charges_enabled, details_submitted, payouts_enabled, default_currency, country, capabilities_card_payments, capabilities_platform_payments } = account
    const stripeDBdata = {
      charges_enabled: account.charges_enabled,
      details_submitted: account.details_submitted,
      payouts_enabled: account.payouts_enabled,
      default_currency: account.default_currency,
      country: account.country,
      payout_schedule: account.payout_schedule.delay_days,
      capabilities_card_payments: account.capabilities.card_payments,
      capabilities_platform_payments: account.capabilities.platform_payments,
      fields_needed: account.verification.fields_needed,
    }
    console.log('--------', stripeDBdata)

    const updatedStripeData = await db.StripeData.update(stripeDBdata,
      {
        where: { stripe_account_id: user.stripe_account_id },
        returning: true,
        plain: true
      })
    console.log('updatedStripeData', updatedStripeData[1].dataValues);
    res.status(200).send(updatedStripeData[1])
    // res.send(Buffer.from(updatedStripeData))
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};

const getAccountBalance = async (req, res) => {
  const user = req.user
  console.log('stripe-controller: fetching stripe account balance', user.toJSON())
  if (!user) return null;
  try {
    const balance = await stripe.balance.retrieve({
      stripe_account: user.stripe_account_id, //stripeAccount
    });
    console.log('balance is now::: ', balance.pending)
    const updatedStripeBalance = await db.StripeData.update(
      {
        balance_pending_amount: balance.pending[0].amount,
        balance_pending_curr: balance.pending[0].currency
      },
      {
        where: { stripe_account_id: user.stripe_account_id },
        returning: true,
        plain: true
      })

    console.log("BALANCE ===>", updatedStripeBalance[1].dataValues);
    res.json(updatedStripeBalance[1])
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
};

//is additional validation necessary if e.g. we want to transfer the payments?
const getPayoutSetting = async (req, res) => {
  try {
    const user = req.user
    const loginLink = await stripe.accounts.createLoginLink(
      user.stripe_account_id,
      {
        redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
      }
    );
    console.log("LOGIN LINK FOR PAYOUT SETTING", loginLink);
    res.json(loginLink);
  } catch (err) {
    console.log("STRIPE PAYOUT SETTING ERR ", err.raw.message);
    err.raw.message ? res.status(500).send(err.raw.message) : err
  }
};

const testAccountBalance = async (req, res) => {
  const user = req.user
  try {
    console.log('updatedStripeBalance');
    const updated = await db.StripeData.update(
      {
        balance_pending: [{ amount: 0, currency: 'dkk', source_types: 1 }, { amount: 10, currency: 'usd', source_types: 1 }]
      },
      {
        where: { stripe_account_id: user.stripe_account_id },
        plain: true
      })
    res.status(200).send(updated)
  } catch (err) {
    console.log('***********', err);
    res.status(500).send(err)
  }
}

const stripeSuccess = async (req, res) => {
  console.log('stripeSuccess controller', req.body);

  const user = req.user
  console.log('userId:', user.dataValues.id, '\n with session:', user.stripe_session_id, ' \n registration complete:', user.stripe_registration_complete);
  try {
    // 1 get product id from req.body
    const { productId } = req.body;
    // 2 find currently logged in user
    // check if user has stripeSession
    // if (!user.stripeSession) return;
    // 3 retrieve stripe session, based on session id we previously save in user db
    const session = await stripe.checkout.sessions.retrieve(
      user.stripe_session_id
    );
    console.log('ID:', session.id, '\n -- res from stripe:', session.payment_status, '\n url', session.url);
    // 4 if session payment status is paid, create order
    if (session.payment_status === "paid") {
      // 5 check if order with that session id already exist by querying orders collection
      // const orderExist = await Order.findOne({
      //   "session.id": session.id,
      // }).exec();
      // if (orderExist) {
      //   // 6 if order exist, send success true
      // res.json({ success: true });
      // } else {
      //   // 7 else create new order and send success true
      //   let newOrder = await new Order({
      //     product: productId,
      //     session,
      //     orderedBy: user._id,
      //   }).save();
      // 8 remove user's stripeSession
      const updatedStripeSessionId = await db.User.update({ stripe_session_id: '' },
        {
          where: { id: user.id },
          plain: true
        })
      console.log('updatedStripeSessionId.....', updatedStripeSessionId);
      res.json({ success: true });
    } else {
      console.log('stripe payment check failre - status is still unpaid');
      res.json({ success: false });
    }
  } catch (err) {
    console.log("STRIPE SUCCESS ERR", err);
  }
};

module.exports = { createConnectAccount, createSessionId, getAccountStatus, getAccountBalance, getPayoutSetting, testAccountBalance, stripeSuccess }

// res from stripe sessionId
//   id: 'cs_test_a1aUqO2yl3RqF7IO43pjhiTOGiMvvsluIOHQJUUN1SxU92lClX2Be4n6gL',
//   object: 'checkout.session',
//   allow_promotion_codes: null,
//   amount_subtotal: 12300,
//   amount_total: 12300,
//   automatic_tax: { enabled: false, status: null },
//   billing_address_collection: null,
//   cancel_url: 'http://localhost:3000/stripe/failure',
//   client_reference_id: null,
//   currency: 'dkk',
//   customer: null,
//   customer_details: null,
//   customer_email: null,
//   livemode: false,
//   locale: null,
//   metadata: {},
//   mode: 'payment',
//   payment_intent: 'pi_3JKRWRAR2XieTSCl3F5CKfkB',
//   payment_method_options: {},
//   payment_method_types: [ 'card' ],
//   payment_status: 'unpaid',
//   setup_intent: null,
//   shipping: null,
//   shipping_address_collection: null,
//   submit_type: null,
//   subscription: null,
//   success_url: 'http://localhost:3000/stripe/success',
//   total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
//   url: 'https://checkout.stripe.com/pay/cs_test_a1aUqO2yl3RqF7IO43pjhiTOGiMvvsluIOHQJUUN1SxU92lClX2Be4n6gL#fidkdWxOYHwnPyd1blpxYHZxWmxuYVZWRG5tc3RLRDBDRlZVQVJgYDNQMicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl'
