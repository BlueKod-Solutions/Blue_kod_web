// src/config/db.js
const mongoose = require('mongoose');

/**
 * Connect to MongoDB using the URI from environment variables.
 * Retries once on initial failure.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bluekod';

  try {
    const conn = await mongoose.connect(uri, {
      // These are the recommended options for Mongoose 8+
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
    console.log(`    Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌  MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
}

// Mongoose connection event listeners
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️   MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄  MongoDB reconnected');
});

module.exports = connectDB;
