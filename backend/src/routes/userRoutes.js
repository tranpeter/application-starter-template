/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
} = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply authentication middleware
router.use(protect);

// User profile routes (available to all authenticated users)
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// User management routes (restricted to admin)
router.route('/')
  .get(authorize(['admin']), getUsers)
  .post(authorize(['admin']), createUser);

router.route('/:id')
  .get(authorize(['admin']), getUserById)
  .put(authorize(['admin']), updateUser)
  .delete(authorize(['admin']), deleteUser);

module.exports = router;
