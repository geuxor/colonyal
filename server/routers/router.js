const router = require('express').Router();
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth');
const messageController = require('../controllers/message.controller')
console.log('router:                       💫 Entering Router');

router.post('/register', userController.addUser);
router.get('/login', userController.loginUser);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/logout', authMiddleware, userController.logoutUser);
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;
