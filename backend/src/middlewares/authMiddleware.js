/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = require('../utils/logger');

/**
 * Protect routes - Verify JWT token
 */
const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, config.jwt.secret);

      // Set user in request object
      req.user = decoded;

      next();
    } catch (error) {
      logger.error(`Auth error: ${error.message}`);
      res.status(401);
      next(new Error('Not authorized, invalid token'));
    }
  }

  if (!token) {
    res.status(401);
    next(new Error('Not authorized, no token provided'));
  }
};

/**
 * Authorize roles - Check if user has required role
 * @param {Array} roles - Array of allowed roles
 */
const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      return next(new Error('Not authorized, no user found'));
    }

    if (!roles.includes(req.user.role)) {
      res.status(403);
      return next(new Error('Not authorized, insufficient permissions'));
    }

    next();
  };
};

module.exports = {
  protect,
  authorize,
};
