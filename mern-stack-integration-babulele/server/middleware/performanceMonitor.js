// performanceMonitor.js - API performance monitoring middleware

const logger = require('../utils/logger');

/**
 * Performance monitoring middleware
 * Tracks API response times and logs slow requests
 */
const performanceMonitor = (req, res, next) => {
  const startTime = Date.now();
  const slowRequestThreshold = parseInt(process.env.SLOW_REQUEST_THRESHOLD || '1000'); // 1 second default

  // Override res.end to track response time
  const originalEnd = res.end;
  res.end = function (chunk, encoding) {
    const responseTime = Date.now() - startTime;

    // Log slow requests
    if (responseTime > slowRequestThreshold) {
      logger.warn('Slow Request Detected', {
        method: req.method,
        url: req.originalUrl,
        responseTime: `${responseTime}ms`,
        statusCode: res.statusCode,
        ip: req.ip,
        userAgent: req.get('user-agent'),
      });
    }

    // Log all requests in development
    if (process.env.NODE_ENV === 'development') {
      logger.info('Request', {
        method: req.method,
        url: req.originalUrl,
        responseTime: `${responseTime}ms`,
        statusCode: res.statusCode,
      });
    }

    // Call original end method
    originalEnd.call(this, chunk, encoding);
  };

  // Add response time header
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    res.setHeader('X-Response-Time', `${responseTime}ms`);
  });

  next();
};

/**
 * Memory usage monitoring
 * Logs memory usage periodically
 */
const memoryMonitor = () => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  setInterval(() => {
    const usage = process.memoryUsage();
    const memoryUsage = {
      rss: Math.round(usage.rss / 1024 / 1024) + ' MB',
      heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + ' MB',
      heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + ' MB',
      external: Math.round(usage.external / 1024 / 1024) + ' MB',
    };

    // Warn if heap usage is high
    const heapUsedPercent = (usage.heapUsed / usage.heapTotal) * 100;
    if (heapUsedPercent > 80) {
      logger.warn('High Memory Usage', memoryUsage);
    } else {
      logger.debug('Memory Usage', memoryUsage);
    }
  }, 5 * 60 * 1000); // Every 5 minutes
};

module.exports = {
  performanceMonitor,
  memoryMonitor,
};

