const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const { guestOnly } = require('../middleware/auth');
const { validateSignup, validateLogin } = require('../middleware/validation');
