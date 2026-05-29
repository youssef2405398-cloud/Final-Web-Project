const express = require('express');
const router = express.Router();
const eventCtrl = require('../controllers/eventController');
const { isAuthenticated } = require('../middleware/auth');
