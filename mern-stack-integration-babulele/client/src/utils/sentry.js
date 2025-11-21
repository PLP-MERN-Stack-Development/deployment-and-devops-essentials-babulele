// sentry.js - Sentry error tracking configuration for frontend

import * as Sentry from '@sentry/react';

/**
 * Initialize Sentry for error tracking and performance monitoring
 */
export const initSentry = () => {
  // Only initialize in production
  if (import.meta.env.MODE !== 'production') {
    console.log('Sentry disabled in non-production environment');
    return;
  }

  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) {
    console.warn('VITE_SENTRY_DSN not set, Sentry error tracking disabled');
    return;
  }

  try {
    Sentry.init({
      dsn: dsn,
      environment: import.meta.env.VITE_ENV || 'production',
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      // Performance Monitoring
      tracesSampleRate: parseFloat(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE || '0.1'), // 10% of transactions
      // Session Replay
      replaysSessionSampleRate: parseFloat(import.meta.env.VITE_SENTRY_REPLAY_SESSION_SAMPLE_RATE || '0.1'), // 10% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
      // Release tracking
      release: import.meta.env.VITE_SENTRY_RELEASE || `mern-blog-frontend@${import.meta.env.npm_package_version || '1.0.0'}`,
      beforeSend(event, hint) {
        // Filter out non-critical errors
        if (event.exception) {
          const error = hint.originalException;
          // Don't send network errors (handled by axios interceptor)
          if (error && error.isAxiosError) {
            return null;
          }
        }
        return event;
      },
    });

    console.log('Sentry initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Sentry:', error);
  }
};

export default Sentry;

