/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

const knex = require('knex');
const config = require('../config/config');
const logger = require('../utils/logger');

const db = knex(config.db);

/**
 * User model
 */
class User {
  /**
   * Find a user by ID
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} User object or null
   */
  static async findById(id) {
    try {
      return await db('users').where({ id }).first();
    } catch (error) {
      logger.error(`Error finding user by ID: ${error.message}`);
      return null;
    }
  }

  /**
   * Find a user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User object or null
   */
  static async findByEmail(email) {
    try {
      return await db('users').where({ email }).first();
    } catch (error) {
      logger.error(`Error finding user by email: ${error.message}`);
      return null;
    }
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object|null>} Created user object or null
   */
  static async create(userData) {
    try {
      const [id] = await db('users').insert(userData).returning('id');
      return await User.findById(id);
    } catch (error) {
      logger.error(`Error creating user: ${error.message}`);
      return null;
    }
  }

  /**
   * Update a user
   * @param {number} id - User ID
   * @param {Object} userData - User data to update
   * @returns {Promise<Object|null>} Updated user object or null
   */
  static async update(id, userData) {
    try {
      await db('users').where({ id }).update(userData);
      return await User.findById(id);
    } catch (error) {
      logger.error(`Error updating user: ${error.message}`);
      return null;
    }
  }

  /**
   * Delete a user
   * @param {number} id - User ID
   * @returns {Promise<boolean>} True if deleted, false otherwise
   */
  static async delete(id) {
    try {
      const deletedCount = await db('users').where({ id }).del();
      return deletedCount > 0;
    } catch (error) {
      logger.error(`Error deleting user: ${error.message}`);
      return false;
    }
  }

  /**
   * Get all users with pagination
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Users and pagination info
   */
  static async getAll(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      
      const [users, totalCount] = await Promise.all([
        db('users').select('id', 'name', 'email', 'role', 'created_at', 'updated_at')
          .limit(limit)
          .offset(offset)
          .orderBy('name'),
        db('users').count('id as count').first()
      ]);
      
      return {
        users,
        pagination: {
          page,
          limit,
          totalUsers: parseInt(totalCount.count, 10),
          totalPages: Math.ceil(parseInt(totalCount.count, 10) / limit)
        }
      };
    } catch (error) {
      logger.error(`Error getting all users: ${error.message}`);
      return { users: [], pagination: { page, limit, totalUsers: 0, totalPages: 0 } };
    }
  }
}

module.exports = User;
