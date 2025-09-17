/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

const logger = require('../utils/logger');

/**
 * @desc    Get all inventory items
 * @route   GET /api/inventory
 * @access  Private
 */
const getInventoryItems = async (req, res, next) => {
  try {
    // Mock implementation - replace with actual database query
    const items = [
      { 
        id: 1, 
        name: 'Dental Gloves', 
        category: 'Supplies', 
        sku: 'GLV-001', 
        quantity: 500,
        minimumQuantity: 100,
        unit: 'pairs',
        location: 'Cabinet A',
        notes: 'Nitrile gloves, size M',
        lastUpdated: new Date()
      },
      { 
        id: 2, 
        name: 'Anesthetic', 
        category: 'Medication', 
        sku: 'ANS-002', 
        quantity: 20,
        minimumQuantity: 5,
        unit: 'vials',
        location: 'Medication Cabinet',
        expiryDate: new Date(2026, 0, 15),
        lotNumber: 'LOT-12345',
        notes: 'Lidocaine 2%',
        lastUpdated: new Date()
      }
    ];

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const results = {
      items: items.slice(startIndex, endIndex),
      page,
      limit,
      totalItems: items.length,
      totalPages: Math.ceil(items.length / limit)
    };
    
    res.json(results);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single inventory item by ID
 * @route   GET /api/inventory/:id
 * @access  Private
 */
const getInventoryItemById = async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    
    // Mock implementation - replace with actual database query
    const item = { 
      id: itemId, 
      name: 'Dental Gloves', 
      category: 'Supplies', 
      sku: 'GLV-001', 
      quantity: 500,
      minimumQuantity: 100,
      unit: 'pairs',
      location: 'Cabinet A',
      notes: 'Nitrile gloves, size M',
      lastUpdated: new Date()
    };
    
    if (!item) {
      res.status(404);
      throw new Error('Item not found');
    }
    
    res.json(item);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new inventory item
 * @route   POST /api/inventory
 * @access  Private (Admin, Manager)
 */
const createInventoryItem = async (req, res, next) => {
  try {
    const { 
      name, 
      category, 
      sku, 
      quantity, 
      minimumQuantity, 
      unit, 
      location, 
      expiryDate, 
      lotNumber, 
      notes 
    } = req.body;
    
    // Validate required fields
    if (!name || !category) {
      res.status(400);
      throw new Error('Please provide name and category');
    }
    
    // Mock implementation - replace with actual database insert
    const newItem = {
      id: 3, // In a real app, this would be auto-generated
      name,
      category,
      sku: sku || `${category.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
      quantity: quantity || 0,
      minimumQuantity: minimumQuantity || 0,
      unit: unit || 'units',
      location: location || '',
      expiryDate: expiryDate || null,
      lotNumber: lotNumber || null,
      notes: notes || '',
      createdBy: req.user.id,
      lastUpdated: new Date()
    };
    
    logger.info(`Inventory item created: ${newItem.name}`);
    
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an inventory item
 * @route   PUT /api/inventory/:id
 * @access  Private (Admin, Manager)
 */
const updateInventoryItem = async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    
    // Mock implementation - replace with actual database query
    let item = { 
      id: itemId, 
      name: 'Dental Gloves', 
      category: 'Supplies', 
      sku: 'GLV-001', 
      quantity: 500,
      minimumQuantity: 100,
      unit: 'pairs',
      location: 'Cabinet A',
      notes: 'Nitrile gloves, size M',
      lastUpdated: new Date()
    };
    
    if (!item) {
      res.status(404);
      throw new Error('Item not found');
    }
    
    // Update fields
    const updatedItem = {
      ...item,
      ...req.body,
      lastUpdated: new Date(),
      updatedBy: req.user.id
    };
    
    logger.info(`Inventory item updated: ${updatedItem.name}`);
    
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an inventory item
 * @route   DELETE /api/inventory/:id
 * @access  Private (Admin only)
 */
const deleteInventoryItem = async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    
    // Mock implementation - replace with actual database query and delete
    const item = { 
      id: itemId, 
      name: 'Dental Gloves'
    };
    
    if (!item) {
      res.status(404);
      throw new Error('Item not found');
    }
    
    logger.info(`Inventory item deleted: ${item.name} (ID: ${item.id})`);
    
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update inventory item quantity
 * @route   PUT /api/inventory/:id/quantity
 * @access  Private (All roles)
 */
const updateInventoryQuantity = async (req, res, next) => {
  try {
    const { quantity, reason, isAdjustment } = req.body;
    const itemId = parseInt(req.params.id, 10);
    
    if (quantity === undefined) {
      res.status(400);
      throw new Error('Please provide quantity');
    }
    
    // Mock implementation - replace with actual database query
    let item = { 
      id: itemId, 
      name: 'Dental Gloves', 
      quantity: 500
    };
    
    if (!item) {
      res.status(404);
      throw new Error('Item not found');
    }
    
    // Calculate new quantity
    const newQuantity = isAdjustment ? item.quantity + parseInt(quantity, 10) : parseInt(quantity, 10);
    
    if (newQuantity < 0) {
      res.status(400);
      throw new Error('Quantity cannot be negative');
    }
    
    // Update the item
    item.quantity = newQuantity;
    item.lastUpdated = new Date();
    
    // Log the update
    const action = isAdjustment ? 
      (quantity > 0 ? 'added' : 'removed') : 
      'set to';
    const qtyChange = isAdjustment ? Math.abs(quantity) : quantity;
    
    logger.info(`Inventory quantity ${action} ${qtyChange} for ${item.name} (ID: ${item.id}). Reason: ${reason || 'Not provided'}`);
    
    res.json(item);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Import inventory from CSV
 * @route   POST /api/inventory/import
 * @access  Private (Admin, Manager)
 */
const importInventoryCsv = async (req, res, next) => {
  try {
    // In a real implementation, we would:
    // 1. Use multer or similar to handle the file upload
    // 2. Parse the CSV file
    // 3. Validate the data
    // 4. Import the data into the database
    
    // Mock implementation
    logger.info('CSV import requested');
    
    res.json({ 
      message: 'Import successful', 
      importedItems: 5,
      updatedItems: 3,
      failedItems: 0
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Export inventory to CSV
 * @route   GET /api/inventory/export
 * @access  Private (Admin, Manager)
 */
const exportInventoryCsv = async (req, res, next) => {
  try {
    // In a real implementation, we would:
    // 1. Query all inventory items
    // 2. Convert to CSV format
    // 3. Send as a downloadable file
    
    // Mock implementation
    logger.info('CSV export requested');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=inventory-export.csv');
    
    // Send a simple CSV string
    res.send('id,name,category,sku,quantity,minimumQuantity,unit,location,expiryDate,lotNumber,notes\n1,Dental Gloves,Supplies,GLV-001,500,100,pairs,Cabinet A,,,"Nitrile gloves, size M"\n2,Anesthetic,Medication,ANS-002,20,5,vials,Medication Cabinet,2026-01-15,LOT-12345,Lidocaine 2%');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all inventory alerts (low stock and expiring items)
 * @route   GET /api/inventory/alerts
 * @access  Private
 */
const getInventoryAlerts = async (req, res, next) => {
  try {
    // Mock implementation
    const alerts = {
      lowStock: [
        { 
          id: 5, 
          name: 'Composite Filling Material', 
          quantity: 3,
          minimumQuantity: 5
        }
      ],
      expiring: [
        {
          id: 2,
          name: 'Anesthetic',
          expiryDate: new Date(2026, 0, 15),
          daysUntilExpiry: 120,
          quantity: 20
        }
      ]
    };
    
    res.json(alerts);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get low stock items
 * @route   GET /api/inventory/low-stock
 * @access  Private
 */
const getLowStockItems = async (req, res, next) => {
  try {
    // Mock implementation
    const lowStockItems = [
      { 
        id: 5, 
        name: 'Composite Filling Material', 
        quantity: 3,
        minimumQuantity: 5,
        category: 'Dental Materials',
        unit: 'syringes'
      }
    ];
    
    res.json(lowStockItems);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get expiring items
 * @route   GET /api/inventory/expiring
 * @access  Private
 */
const getExpiringItems = async (req, res, next) => {
  try {
    // Days threshold, default to 90 days
    const daysThreshold = parseInt(req.query.days, 10) || 90;
    
    // Mock implementation
    const expiringItems = [
      {
        id: 2,
        name: 'Anesthetic',
        expiryDate: new Date(2026, 0, 15),
        daysUntilExpiry: 120,
        quantity: 20,
        category: 'Medication',
        lotNumber: 'LOT-12345'
      }
    ].filter(item => item.daysUntilExpiry <= daysThreshold);
    
    res.json(expiringItems);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInventoryItems,
  getInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  updateInventoryQuantity,
  importInventoryCsv,
  exportInventoryCsv,
  getInventoryAlerts,
  getLowStockItems,
  getExpiringItems,
};
