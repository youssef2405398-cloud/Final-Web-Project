const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Configure local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
//
