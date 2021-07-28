const router = require('express').Router();
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth');

// add the paths for register, login, me, and logout here
console.log('💫 Entering Router');

router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.profile);
router.post('/logout', authMiddleware, userController.logout);

module.exports = router;
