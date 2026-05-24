const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function dump() {
  await mongoose.connect(process.env.MONGODB_URI);
  const users = await User.find({}).select('+password');
  console.log('Total users:', users.length);
  for (let u of users) {
    console.log(`Email: ${u.email}, Name: ${u.name}, Hash: ${u.password.substring(0, 15)}...`);
  }
  process.exit(0);
}
dump();
