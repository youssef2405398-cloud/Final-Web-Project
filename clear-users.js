const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB');
    await User.deleteMany({});
    console.log('Deleted all users.');
    process.exit(0);
  })
  .catch(err => console.error(err));
