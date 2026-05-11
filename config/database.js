// config/database.js
require('dotenv').config();
const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas with production-ready options
 * @returns {Promise<mongoose.Connection>}
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Atlas-specific connection options
      serverSelectionTimeoutMS: 5000, // Fail fast if DB unreachable
      socketTimeoutMS: 45000, // Close idle sockets after 45s
      // Optional: Enable query debugging in development only
      // debug: process.env.NODE_ENV !== 'production'
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Connection event listeners for resilience
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB Error:', err.message);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB Disconnected - attempting reconnect...');
    });
    
    // Graceful shutdown handling
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed through app termination');
      process.exit(0);
    });
    
    return conn.connection;
    
  } catch (error) {
    console.error('❌ Database Connection Failed:', error.message);
    console.log('\n💡 Troubleshooting Checklist:');
    console.log('┌─────────────────────────────────────┐');
    console.log('│ 1. Atlas Network Access:            │');
    console.log('│    • Is your IP whitelisted?        │');
    console.log('│    • For testing: add 0.0.0.0/0     │');
    console.log('│                                     │');
    console.log('│ 2. Connection String:               │');
    console.log('│    • Password URL-encoded?          │');
    console.log('│      @ → %40, ! → %21, etc.         │');
    console.log('│    • Database name included?        │');
    console.log('│                                     │');
    console.log('│ 3. Database User Permissions:       │');
    console.log('│    • User has readWrite access?     │');
    console.log('│    • Correct database selected?     │');
    console.log('│                                     │');
    console.log('│ 4. Environment:                     │');
    console.log('│    • .env file loaded?              │');
    console.log('│    • NODE_ENV set correctly?        │');
    console.log('└─────────────────────────────────────┘');
    process.exit(1); // Exit with failure code - critical for production
  }
};

module.exports = connectDB;