const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function test() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected');
    
    // clear existing
    await User.deleteMany({ email: 'testdb@example.com' });
    
    // create user
    const u = await User.create({
      name: 'Test DB',
      email: 'testdb@example.com',
      password: 'password123',
      role: 'student'
    });
    console.log('Created user:', u._id);
    
    const found = await User.findOne({ email: 'testdb@example.com' }).select('+password');
    console.log('Found user:', found ? found.email : 'not found');
    console.log('Password hash:', found ? found.password : 'n/a');
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

test();
