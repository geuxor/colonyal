//initialize the Stripe client for backend
// const axios = require('axios');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



async function createConnectedAccount() {
  console.log('entering stripe api - createConnectedAccount');
  try {
    const account = await stripe.accounts.create({
      country: 'DK',
      type: "express",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true }
      }
    })
    return account
  } catch (err) {
    console.log('unable to create account', err);
    return 'error'
  }
}


async function getSessionId(req, res) {
  console.log('index getsessionid', req.body)
  let amount = req.body.amount;
  let stripeUserId = req.body.stripeUserId;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          product_data: {
            name: 'Donation'
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
    // console.log(sessionId)
    res.status(200).json({ sessionId: sessionId })
  } catch (err) {
    res.status(500).send('Error!');
  }
}

module.exports = { createCustomer, createConnectedAccount, listCustomerCards, addCustomerCard, getSessionId }
