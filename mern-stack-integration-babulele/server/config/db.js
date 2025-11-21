// db.js - MongoDB connection configuration

const mongoose = require('mongoose');
const logger = require('../utils/logger');

/**
 * Connect to MongoDB database
 * Uses connection string from environment variables
 * Implements connection pooling for better performance
 */
const connectDB = async () => {
  try {
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      logger.error('MONGODB_URI is not set in environment variables');
      logger.error('Please set MONGODB_URI in your .env file');
      process.exit(1);
    }

    // Log connection attempt (without showing the full URI for security)
    const uriParts = process.env.MONGODB_URI.split('@');
    const dbInfo = uriParts.length > 1 ? uriParts[1] : 'localhost';
    
    // Connection options with connection pooling
    const connectionOptions = {
      // Connection timeout settings
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      
      // Connection pooling settings for better performance
      maxPoolSize: 10, // Maximum number of connections in the pool
      minPoolSize: 2, // Minimum number of connections in the pool
      maxIdleTimeMS: 30000, // Close connections after 30s of inactivity
      
      // Retry settings
      retryWrites: true, // Retry write operations on network errors
      retryReads: true, // Retry read operations on network errors
      
      // Buffer settings
      bufferMaxEntries: 0, // Disable mongoose buffering
      bufferCommands: false, // Disable mongoose buffering
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, connectionOptions);

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    logger.info(`Database: ${conn.connection.name}`);
    logger.info(`Connection Pool Size: ${conn.connection.maxPoolSize || 'default'}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

    mongoose.connection.on('connecting', () => {
      logger.info('MongoDB connecting...');
    });

    // Handle app termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error.message);
    
    // Provide helpful error messages based on error type
    if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
      logger.error('Authentication failed. Please check:');
      logger.error('  1. Your MongoDB username and password in MONGODB_URI');
      logger.error('  2. That your MongoDB user has the correct permissions');
      logger.error('  3. That your MongoDB connection string is correct');
      logger.error('  Example format: mongodb+srv://username:password@cluster.mongodb.net/database');
    } else if (error.message.includes('ECONNREFUSED')) {
      logger.error('Connection refused. Please check:');
      logger.error('  1. MongoDB is running on your machine');
      logger.error('  2. The host and port in MONGODB_URI are correct');
      logger.error('  3. MongoDB is accessible from your network');
    } else if (error.message.includes('ENOTFOUND')) {
      logger.error('Host not found. Please check:');
      logger.error('  1. The hostname in MONGODB_URI is correct');
      logger.error('  2. Your internet connection is working');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;

