const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const { guestOnly } = require('../middleware/auth');
const { validateSignup, validateLogin } = require('../middleware/validation');
const { handleValidationErrors } = require('../middleware/errorHandler');

router.get('/login', guestOnly, authCtrl.getLogin);
router.post('/login', guestOnly, validateLogin, handleValidationErrors, authCtrl.postLogin);

router.get('/signup', guestOnly, authCtrl.getSignup);
router.post('/signup', guestOnly, validateSignup, handleValidationErrors, authCtrl.postSignup);

router.get('/logout', authCtrl.logout);

module.exports = router;