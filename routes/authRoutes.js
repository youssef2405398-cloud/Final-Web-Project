const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const { guestOnly } = require('../middleware/auth');
const { validateSignup, validateLogin } = require('../middleware/validation');
const { asyncHandler, handleValidationErrors } = require('../middleware/errorHandler');

router.get('/login', guestOnly, authCtrl.getLogin);
router.get('/signup', guestOnly, authCtrl.getSignup);

router.post('/signup', validateSignup, handleValidationErrors, asyncHandler(authCtrl.postSignup));
router.post('/login', validateLogin, handleValidationErrors, asyncHandler(authCtrl.postLogin));

router.get('/logout', authCtrl.logout);

module.exports = router;