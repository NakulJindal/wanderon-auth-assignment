const rateLimit = require('express-rate-limit');

const env = process.env.NODE_ENV || 'development';

/**
 * Create a rate limiter middleware
 * @param {Object} options - Rate limiter options
 * @returns {Function} Express middleware
 */
const createLimiter = (options) => {
  return rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000, // Default: 15 minutes
    limit: options.max || 100, // Default: 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        status: 429,
        message: options.message || 'Too many requests, please try again later.',
    },
    ...options,
  });
};

// General API Rate Limiter
// Allow 100 requests per 15 minutes
const apiLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, 
  limit: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Stricter Auth Rate Limiter (Login/Register)
// Allow 10 requests per 15 minutes to prevent brute-force attacks
const authLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: 'Too many login attempts from this IP, please try again after 15 minutes',
});

module.exports = {
  apiLimiter,
  authLimiter,
};

