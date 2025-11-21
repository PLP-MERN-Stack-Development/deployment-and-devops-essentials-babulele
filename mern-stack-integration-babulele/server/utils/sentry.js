// sentry.js - Sentry error tracking configuration

const Sentry = require('@sentry/node');
const { ProfilingIntegration } = require('@sentry/profiling-node');
const logger = require('./logger');

/**
 * Initialize Sentry for error tracking and performance monitoring
 */
const initSentry = () => {
  // Only initialize in production
  if (process.env.NODE_ENV !== 'production') {
    logger.info('Sentry disabled in non-production environment');
    return;
  }

  const dsn = process.env.SENTRY_DSN;
  if (!dsn) {
    logger.warn('SENTRY_DSN not set, Sentry error tracking disabled');
    return;
  }

  try {
    Sentry.init({
      dsn: dsn,
      environment: process.env.NODE_ENV || 'production',
      integrations: [
        // Enable profiling
        new ProfilingIntegration(),
      ],
      // Performance Monitoring
      tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1'), // 10% of transactions
      // Profiling
      profilesSampleRate: parseFloat(process.env.SENTRY_PROFILES_SAMPLE_RATE || '0.1'), // 10% of transactions
      // Release tracking
      release: process.env.SENTRY_RELEASE || `mern-blog@${process.env.npm_package_version || '1.0.0'}`,
      // Filter out health check endpoints
      ignoreErrors: [
        'ECONNREFUSED',
        'ENOTFOUND',
      ],
      beforeSend(event, hint) {
        // Log to Winston as well
        if (event.level === 'error' || event.level === 'fatal') {
          logger.error('Sentry Event:', {
            message: event.message,
            level: event.level,
            tags: event.tags,
          });
        }
        return event;
      },
    });

    logger.info('Sentry initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize Sentry:', error);
  }
};

/**
 * Express middleware for Sentry request tracking
 */
const sentryMiddleware = Sentry.Handlers.requestHandler();

/**
 * Express middleware for Sentry error tracking
 */
const sentryErrorHandler = Sentry.Handlers.errorHandler({
  shouldHandleError(error) {
    // Don't track 4xx errors (client errors)
    if (error.statusCode && error.statusCode < 500) {
      return false;
    }
    return true;
  },
});

/**
 * Capture exception manually
 */
const captureException = (error, context = {}) => {
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    Sentry.captureException(error, {
      tags: context.tags || {},
      extra: context.extra || {},
    });
  }
};

/**
 * Capture message manually
 */
const captureMessage = (message, level = 'info', context = {}) => {
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    Sentry.captureMessage(message, {
      level: level,
      tags: context.tags || {},
      extra: context.extra || {},
    });
  }
};

module.exports = {
  initSentry,
  sentryMiddleware,
  sentryErrorHandler,
  captureException,
  captureMessage,
  Sentry,
};

