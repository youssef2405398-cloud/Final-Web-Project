const { body, param } = require('express-validator');

// Signup form validation
exports.validateSignup = [
  body('