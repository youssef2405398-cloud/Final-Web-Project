const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkd

  const morgan = require('morgan');
  const path = require('path');
  const fs = require('fs');
  
  // Ensure logs directory exists
  const logDir = path.join(__dirname, '../logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  // Skip logging in test environments
  const skip = () => process.env.NODE_ENV === 'test';
  
  // Create write stream for production logs
  const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });
  
  module.exports = morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', {
    stream: process.env.NODE_ENV === 'production' ? accessLogStream : process.stdout,
    skip
  });