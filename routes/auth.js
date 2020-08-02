const express = require('express');
const authController = require('../controllers/auth');
const validToken = require('../middleware/valid-token');
const isGuest = require('../middleware/is-guest');
const router = express.Router();

router.get('/login', validToken, authController.getLogin);
router.post('/login', authController.postLogin);

router.post('/logout', isGuest, authController.postLogout);

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

module.exports = router;
