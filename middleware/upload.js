const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Configure local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
//

const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Configure local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Files are saved to public/uploads/events/
    cb(null, 'public/uploads/events/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename: <timestamp>-<random hex>.<ext>
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(4).toString('hex');
    cb(null, 'event-' + uniqueSuffix + ext);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload;

