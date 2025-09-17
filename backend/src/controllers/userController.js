/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private (Admin only)
 */
const getUsers = async (req, res, next) => {
  try {
    // Mock implementation - replace with actual database query
    const users = [
      { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
      { id: 2, name: 'Manager User', email: 'manager@example.com', role: 'manager' },
      { id: 3, name: 'Assistant User', email: 'assistant@example.com', role: 'assistant' },
    ];

    // Remove password from response
    const sanitizedUsers = users.map(({ password, ...user }) => user);
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const results = {
      users: sanitizedUsers.slice(startIndex, endIndex),
      page,
      limit,
      totalUsers: sanitizedUsers.length,
      totalPages: Math.ceil(sanitizedUsers.length / limit)
    };
    
    res.json(results);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Private (Admin only)
 */
const getUserById = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    
    // Mock implementation - replace with actual database query
    const user = { 
      id: userId, 
      name: 'Admin User', 
      email: 'admin@example.com', 
      role: 'admin' 
    };
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    
    // Remove password from response
    const { password, ...sanitizedUser } = user;
    
    res.json(sanitizedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new user
 * @route   POST /api/users
 * @access  Private (Admin only)
 */
const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Validate required fields
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please provide name, email, and password');
    }
    
    // Check if email already exists
    // const userExists = await User.findByEmail(email);
    const userExists = false; // Mock implementation
    
    if (userExists) {
      res.status(400);
      throw new Error('User with this email already exists');
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user - mock implementation
    const newUser = {
      id: 4, // In a real app, this would be auto-generated
      name,
      email,
      role: role || 'assistant', // Default role
      createdAt: new Date()
    };
    
    logger.info(`User created: ${newUser.name} (${newUser.email}) with role ${newUser.role}`);
    
    // Remove password from response
    const { password: _, ...sanitizedUser } = newUser;
    
    res.status(201).json(sanitizedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a user
 * @route   PUT /api/users/:id
 * @access  Private (Admin only)
 */
const updateUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    
    // Mock implementation - replace with actual database query
    let user = { 
      id: userId, 
      name: 'Admin User', 
      email: 'admin@example.com', 
      role: 'admin' 
    };
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    
    // Update fields
    const { password, ...updates } = req.body;
    
    let hashedPassword;
    if (password) {
      // Hash new password if provided
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }
    
    const updatedUser = {
      ...user,
      ...updates,
      ...(hashedPassword && { password: hashedPassword }),
      updatedAt: new Date()
    };
    
    logger.info(`User updated: ${updatedUser.name} (ID: ${updatedUser.id})`);
    
    // Remove password from response
    const { password: _, ...sanitizedUser } = updatedUser;
    
    res.json(sanitizedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a user
 * @route   DELETE /api/users/:id
 * @access  Private (Admin only)
 */
const deleteUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    
    // Mock implementation - replace with actual database query and delete
    const user = { 
      id: userId, 
      name: 'Test User',
      email: 'test@example.com'
    };
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    
    logger.info(`User deleted: ${user.name} (${user.email})`);
    
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getProfile = async (req, res, next) => {
  try {
    // Get user from request object (set by auth middleware)
    const userId = req.user.id;
    
    // Mock implementation - replace with actual database query
    const user = { 
      id: userId, 
      name: 'Current User', 
      email: 'user@example.com', 
      role: req.user.role 
    };
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    
    // Remove password from response
    const { password, ...sanitizedUser } = user;
    
    res.json(sanitizedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update current user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    // Get user from request object (set by auth middleware)
    const userId = req.user.id;
    
    // Mock implementation - replace with actual database query
    let user = { 
      id: userId, 
      name: 'Current User', 
      email: 'user@example.com', 
      role: req.user.role 
    };
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    
    // Update allowed fields only (not role)
    const { name, email, password, currentPassword } = req.body;
    
    // If user wants to change password, verify current password
    if (password) {
      if (!currentPassword) {
        res.status(400);
        throw new Error('Current password is required to set a new password');
      }
      
      // Mock password check
      const isPasswordValid = true;
      
      if (!isPasswordValid) {
        res.status(401);
        throw new Error('Current password is incorrect');
      }
      
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    
    // Update other fields
    if (name) user.name = name;
    if (email) user.email = email;
    
    user.updatedAt = new Date();
    
    logger.info(`User profile updated: ${user.name} (ID: ${user.id})`);
    
    // Remove password from response
    const { password: _, ...sanitizedUser } = user;
    
    res.json(sanitizedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
};
