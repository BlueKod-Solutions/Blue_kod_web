// src/middleware/errorHandler.js

/**
 * Global error handler – must be registered LAST in Express middleware chain.
 */
function errorHandler(err, req, res, next) {     // eslint-disable-line no-unused-vars
  const status  = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${new Date().toISOString()}] ${status} ${req.method} ${req.path} –`, err.stack || err);
  }

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}

/**
 * 404 handler – register AFTER all routes.
 */
function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
}

module.exports = { errorHandler, notFound };
