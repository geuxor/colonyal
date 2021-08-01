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
// router.get('/status', authMiddleware, userController.getStatus);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/logout', userController.logoutUser);
router.get('/profile', authMiddleware, userController.getUserProfile);

//stripe routes
const stripeController = require('./controllers/stripe.controller')
router.get('/stripe/connect-account', authMiddleware, stripeController.createConnectAccount)
router.get("/stripe/account-status", authMiddleware, stripeController.getAccountStatus);
router.get("/stripe/account-balance", authMiddleware, stripeController.getAccountBalance);
router.get("/stripe/payout-setting", authMiddleware, stripeController.getPayoutSetting);

//product routes

const productController = require('./controllers/product.controller')
// const productOwner = require('../middlewares/product.mw')
const multer = require('multer');
const upload = multer({ dest: '/tmp/' });

// const formidable = require('express-formidable')
router.post("/create-product", authMiddleware, upload.single('file'), productController.addProduct);

// req.files to be arrays of files
// router.post("/create-product", authMiddleware, formidable({ uploadDir: process.env.UPLOAD_DIR, multiples: true }),
//   productController.addProduct);

// router.get("/products", productController.getProducts);
// router.get("/product/image/:productId", productController.image);
// router.get("/seller-products", authMiddleware, productController.sellerProducts);
// router.delete("/delete-product/:productId", authMiddleware, productCreatedby, productController.remove);

module.exports = router;
