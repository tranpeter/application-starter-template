/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');
const logger = require('../utils/logger');

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    // Mock implementation - replace with database query
    // const user = await User.findByEmail(email);
    const user = { id: 1, email: 'admin@example.com', password: await bcrypt.hash('password123', 10), role: 'admin' };

    // Check if user exists
    if (!user) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken(user.id, user.role);

    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;

    // Check if user already exists
    // const userExists = await User.findByEmail(email);
    const userExists = false; // Mock implementation

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    // const user = await User.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    //   role: role || 'assistant', // Default role
    // });
    
    // Mock implementation
    const user = {
      id: 2,
      name,
      email,
      role: role || 'assistant',
    };

    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Refresh authentication token
 * @route   POST /api/auth/refresh-token
 * @access  Private
 */
const refreshToken = async (req, res, next) => {
  try {
    // Get user from the protected route middleware
    const user = req.user;
    
    // Generate a new token
    const token = generateToken(user.id, user.role);
    
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Request password reset
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    // Check if email is provided
    if (!email) {
      res.status(400);
      throw new Error('Please provide email');
    }
    
    // Mock implementation - In a real app, we would:
    // 1. Find the user by email
    // 2. Generate a reset token
    // 3. Send an email with the reset link
    
    logger.info(`Password reset requested for: ${email}`);
    
    res.status(200).json({
      message: 'If an account with that email exists, a password reset link has been sent',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reset password
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    
    // Check if token and password are provided
    if (!token || !password) {
      res.status(400);
      throw new Error('Please provide token and new password');
    }
    
    // Mock implementation - In a real app, we would:
    // 1. Verify the reset token
    // 2. Find the user associated with the token
    // 3. Hash the new password
    // 4. Update the user's password
    // 5. Invalidate the reset token
    
    logger.info(`Password reset completed for token: ${token.substring(0, 10)}...`);
    
    res.status(200).json({
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Generate JWT token
 */
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

module.exports = {
  login,
  register,
  refreshToken,
  forgotPassword,
  resetPassword,
};
