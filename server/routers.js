const router = require('express').Router();
const authMiddleware = require('./middlewares/auth.mw');
console.log('routes:                       💫 importing routes');
//auth routes
const userController = require('./controllers/user.controller')
router.post('/register', userController.addUser);
router.get('/login', userController.loginUser);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/logout', authMiddleware, userController.logoutUser);
router.get('/profile', authMiddleware, userController.getUserProfile);

//stripe routes
const stripeController = require('./controllers/stripe.controller')
router.get('/stripe/connect-account', authMiddleware, stripeController.createConnectAccount)
router.get("/stripe/account-status", authMiddleware, stripeController.getAccountStatus);
router.get("/stripe/account-balance", authMiddleware, stripeController.getAccountBalance);
router.get("/stripe/payout-setting", authMiddleware, stripeController.payoutSetting);

//product routes


module.exports = router;
