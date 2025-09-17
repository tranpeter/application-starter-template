/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

const knex = require('knex');
const config = require('../config/config');
const logger = require('../utils/logger');

const db = knex(config.db);

/**
 * Inventory model
 */
class Inventory {
  /**
   * Find an inventory item by ID
   * @param {number} id - Inventory item ID
   * @returns {Promise<Object|null>} Inventory item or null
   */
  static async findById(id) {
    try {
      return await db('inventory_items').where({ id }).first();
    } catch (error) {
      logger.error(`Error finding inventory item by ID: ${error.message}`);
      return null;
    }
  }

  /**
   * Find inventory item by SKU
   * @param {string} sku - Item SKU
   * @returns {Promise<Object|null>} Inventory item or null
   */
  static async findBySku(sku) {
    try {
      return await db('inventory_items').where({ sku }).first();
    } catch (error) {
      logger.error(`Error finding inventory item by SKU: ${error.message}`);
      return null;
    }
  }

  /**
   * Create a new inventory item
   * @param {Object} itemData - Inventory item data
   * @returns {Promise<Object|null>} Created inventory item or null
   */
  static async create(itemData) {
    try {
      const [id] = await db('inventory_items').insert(itemData).returning('id');
      return await Inventory.findById(id);
    } catch (error) {
      logger.error(`Error creating inventory item: ${error.message}`);
      return null;
    }
  }

  /**
   * Update an inventory item
   * @param {number} id - Inventory item ID
   * @param {Object} itemData - Inventory item data to update
   * @returns {Promise<Object|null>} Updated inventory item or null
   */
  static async update(id, itemData) {
    try {
      await db('inventory_items').where({ id }).update(itemData);
      return await Inventory.findById(id);
    } catch (error) {
      logger.error(`Error updating inventory item: ${error.message}`);
      return null;
    }
  }

  /**
   * Delete an inventory item
   * @param {number} id - Inventory item ID
   * @returns {Promise<boolean>} True if deleted, false otherwise
   */
  static async delete(id) {
    try {
      const deletedCount = await db('inventory_items').where({ id }).del();
      return deletedCount > 0;
    } catch (error) {
      logger.error(`Error deleting inventory item: ${error.message}`);
      return false;
    }
  }

  /**
   * Update inventory item quantity
   * @param {number} id - Inventory item ID
   * @param {number} quantity - New quantity (absolute) or quantity change (relative)
   * @param {boolean} isAdjustment - If true, adjust by quantity; if false, set to quantity
   * @param {Object} metadata - Additional metadata for audit log
   * @returns {Promise<Object|null>} Updated inventory item or null
   */
  static async updateQuantity(id, quantity, isAdjustment = false, metadata = {}) {
    const trx = await db.transaction();
    
    try {
      // Get current item
      const item = await trx('inventory_items').where({ id }).first();
      
      if (!item) {
        await trx.rollback();
        return null;
      }
      
      // Calculate new quantity
      const newQuantity = isAdjustment ? 
        item.quantity + parseInt(quantity, 10) : 
        parseInt(quantity, 10);
      
      if (newQuantity < 0) {
        await trx.rollback();
        throw new Error('Quantity cannot be negative');
      }
      
      // Update the item
      await trx('inventory_items')
        .where({ id })
        .update({ 
          quantity: newQuantity,
          last_updated: new Date()
        });
      
      // Create audit log entry
      await trx('inventory_audit_logs').insert({
        inventory_item_id: id,
        previous_quantity: item.quantity,
        new_quantity: newQuantity,
        change_amount: isAdjustment ? parseInt(quantity, 10) : newQuantity - item.quantity,
        reason: metadata.reason || null,
        action_type: metadata.action_type || 'manual',
        user_id: metadata.user_id,
        created_at: new Date()
      });
      
      await trx.commit();
      
      return await Inventory.findById(id);
    } catch (error) {
      await trx.rollback();
      logger.error(`Error updating inventory quantity: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get all inventory items with pagination and filtering
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Inventory items and pagination info
   */
  static async getAll(options = {}) {
    try {
      const {
        page = 1,
        limit = 20,
        sortBy = 'name',
        sortOrder = 'asc',
        category,
        search,
        lowStock = false,
        expiring = false,
        expiringDays = 90
      } = options;
      
      const offset = (page - 1) * limit;
      
      let query = db('inventory_items');
      
      // Apply filters
      if (category) {
        query = query.where({ category });
      }
      
      if (search) {
        query = query.where(builder => {
          builder.where('name', 'ilike', `%${search}%`)
            .orWhere('sku', 'ilike', `%${search}%`)
            .orWhere('notes', 'ilike', `%${search}%`);
        });
      }
      
      if (lowStock) {
        query = query.whereRaw('quantity <= minimum_quantity');
      }
      
      if (expiring) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + parseInt(expiringDays, 10));
        
        query = query.whereNotNull('expiry_date')
          .andWhere('expiry_date', '<=', expiryDate);
      }
      
      // Get total count with filters
      const totalCountQuery = query.clone().count('id as count').first();
      
      // Apply sorting and pagination to main query
      query = query.orderBy(sortBy, sortOrder)
        .limit(limit)
        .offset(offset);
      
      // Execute both queries
      const [items, totalCount] = await Promise.all([
        query,
        totalCountQuery
      ]);
      
      return {
        items,
        pagination: {
          page,
          limit,
          totalItems: parseInt(totalCount.count, 10),
          totalPages: Math.ceil(parseInt(totalCount.count, 10) / limit)
        }
      };
    } catch (error) {
      logger.error(`Error getting inventory items: ${error.message}`);
      return { items: [], pagination: { page: 1, limit: 20, totalItems: 0, totalPages: 0 } };
    }
  }

  /**
   * Get low stock items
   * @returns {Promise<Array>} Low stock items
   */
  static async getLowStockItems() {
    try {
      return await db('inventory_items')
        .whereRaw('quantity <= minimum_quantity')
        .orderBy('name');
    } catch (error) {
      logger.error(`Error getting low stock items: ${error.message}`);
      return [];
    }
  }

  /**
   * Get expiring items within the specified days
   * @param {number} days - Number of days to look ahead
   * @returns {Promise<Array>} Expiring items
   */
  static async getExpiringItems(days = 90) {
    try {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + days);
      
      return await db('inventory_items')
        .whereNotNull('expiry_date')
        .andWhere('expiry_date', '<=', expiryDate)
        .orderBy('expiry_date');
    } catch (error) {
      logger.error(`Error getting expiring items: ${error.message}`);
      return [];
    }
  }
}

module.exports = Inventory;
