const router = require('express').Router();
const authMiddleware = require('./middlewares/auth.mw');
const statusMiddleware = require('./middlewares/status.mw');
const productCreatedby = require('./middlewares/products.mw');

console.log('routes:                       💫 importing routes');
//auth routes
const userController = require('./controllers/user.controller')
router.post('/register', userController.addUser);
router.post('/login', userController.loginUser);
router.post('/status', statusMiddleware);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/logout', userController.logoutUser);
router.post('/profile', authMiddleware, userController.getUserProfile);

//stripe routes
const stripeController = require('./controllers/stripe.controller')
router.post('/stripe/connect-account', authMiddleware, stripeController.createConnectAccount)
router.post("/stripe/account-status", authMiddleware, stripeController.getAccountStatus);
router.post("/stripe/account-balance", authMiddleware, stripeController.getAccountBalance);
router.post("/stripe/payout-setting", authMiddleware, stripeController.getPayoutSetting);
router.post('/stripe/test', authMiddleware, stripeController.testAccountBalance)
router.post('/stripe/session', authMiddleware, stripeController.createSessionId)
router.post('/stripe/success', authMiddleware, stripeController.stripeSuccess)

//product routes
const productController = require('./controllers/product.controller')
router.post("/products", authMiddleware, productController.allProducts);
router.post("/products/mine", authMiddleware, productController.mineProducts);
router.post("/products/new", authMiddleware, productController.addProduct);
router.post("/products/only", authMiddleware, productController.addOnlyProduct);

module.exports = router;
