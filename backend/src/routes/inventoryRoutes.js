/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

const express = require('express');
const {
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
} = require('../controllers/inventoryController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply authentication middleware
router.use(protect);

// Inventory routes
router.route('/')
  .get(getInventoryItems)
  .post(authorize(['admin', 'manager']), createInventoryItem);

router.route('/:id')
  .get(getInventoryItemById)
  .put(authorize(['admin', 'manager']), updateInventoryItem)
  .delete(authorize(['admin']), deleteInventoryItem);

router.put('/:id/quantity', authorize(['admin', 'manager', 'assistant']), updateInventoryQuantity);

router.post('/import', authorize(['admin', 'manager']), importInventoryCsv);
router.get('/export', authorize(['admin', 'manager']), exportInventoryCsv);

router.get('/alerts', getInventoryAlerts);
router.get('/low-stock', getLowStockItems);
router.get('/expiring', getExpiringItems);

module.exports = router;
