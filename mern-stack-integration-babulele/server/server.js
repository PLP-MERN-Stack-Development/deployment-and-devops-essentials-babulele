// server.js - Main server file for the MERN blog application

// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./utils/logger');

// Load environment variables FIRST
dotenv.config();

// Import database connection
const connectDB = require('./config/db');

// Import routes
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');

// Import error handler
const { errorHandler } = require('./middleware/errorHandler');

// Import Sentry (optional, only if SENTRY_DSN is set)
let sentryMiddleware, sentryErrorHandler;
try {
  const sentry = require('./utils/sentry');
  sentry.initSentry();
  sentryMiddleware = sentry.sentryMiddleware;
  sentryErrorHandler = sentry.sentryErrorHandler;
} catch (error) {
  logger.warn('Sentry not configured, error tracking disabled');
}

// Import performance monitoring
const { performanceMonitor, memoryMonitor } = require('./middleware/performanceMonitor');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  logger.info('Created uploads directory');
}

// Security Middleware - Helmet for secure HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Allow embedding if needed
}));

// CORS Configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL?.split(',') || ['https://your-frontend-domain.com']
    : ['http://localhost:3000', 'http://localhost:5173'], // Vite default port
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sentry request tracking (must be before other middleware)
if (sentryMiddleware) {
  app.use(sentryMiddleware);
}

// Performance monitoring
app.use(performanceMonitor);

// HTTP request logging
if (process.env.NODE_ENV === 'production') {
  // In production, use morgan with winston
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }));
} else {
  // In development, use morgan with colored output
  app.use(morgan('dev'));
}

// Start memory monitoring
memoryMonitor();

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint for monitoring
app.get('/health', async (req, res) => {
  try {
    // Check MongoDB connection
    const mongoose = require('mongoose');
    const dbStatus = mongoose.connection.readyState;
    const dbStates = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    const healthStatus = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: dbStates[dbStatus] || 'unknown',
        readyState: dbStatus,
      },
      memory: {
        used: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100 + ' MB',
        total: Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100 + ' MB',
      },
    };

    // If database is not connected, return 503
    if (dbStatus !== 1) {
      healthStatus.status = 'degraded';
      healthStatus.database.status = 'disconnected';
      return res.status(503).json(healthStatus);
    }

    res.status(200).json(healthStatus);
  } catch (error) {
    logger.error('Health check error:', error);
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
});

// API routes
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  const clientBuildPath = path.join(__dirname, '../client/dist');
  
  if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));
    
    // Handle React routing - return all requests to React app
    app.get('*', (req, res) => {
      // Don't serve index.html for API routes
      if (req.path.startsWith('/api')) {
        return res.status(404).json({
          success: false,
          error: `API route ${req.originalUrl} not found`,
        });
      }
      
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
  } else {
    // If client build doesn't exist, just serve API info
    app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'MERN Blog API is running',
        version: '1.0.0',
        endpoints: {
          posts: '/api/posts',
          categories: '/api/categories',
          auth: '/api/auth',
        },
        note: 'Frontend build not found. Deploy frontend separately or build it.',
      });
    });
    
    // Handle 404 - routes not found
    app.use((req, res, next) => {
      res.status(404).json({
        success: false,
        error: `Route ${req.originalUrl} not found`,
      });
    });
  }
} else {
  // Development mode - just serve API info
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'MERN Blog API is running',
      version: '1.0.0',
      endpoints: {
        posts: '/api/posts',
        categories: '/api/categories',
        auth: '/api/auth',
      },
    });
  });
  
  // Handle 404 - routes not found
  app.use((req, res, next) => {
    res.status(404).json({
      success: false,
      error: `Route ${req.originalUrl} not found`,
    });
  });
}

// Sentry error handler (before custom error handler)
if (sentryErrorHandler) {
  app.use(sentryErrorHandler);
}

// Error handling middleware (must be last)
app.use(errorHandler);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start Express server
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

module.exports = app; 