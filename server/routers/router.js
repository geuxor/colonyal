const router = require('express').Router();
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth');
const messageController = require('../controllers/message.controller')
console.log('💫 Entering Router');

router.post('/register', userController.create);
router.get('/login', userController.login);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/logout', authMiddleware, userController.logout);
// router.get('/profile', authMiddleware, userController.profile);

module.exports = router;
