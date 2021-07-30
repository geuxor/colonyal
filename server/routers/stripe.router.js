const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripe.controller')
// const { requireSignin } = require('../middlewares/stripe.mw')
const authMiddleware = require('../middlewares/auth.mw');
console.log('routes:                       💫 importing stripe routes');

router.get('/stripe/connect-account', authMiddleware, stripeController.createConnectAccount)
router.post("/stripe/account-status", authMiddleware, stripeController.getAccountStatus);
router.post("/stripe/account-balance", authMiddleware, stripeController.getAccountBalance);
router.post("/stripe/payout-setting", authMiddleware, stripeController.payoutSetting);

module.exports = router
