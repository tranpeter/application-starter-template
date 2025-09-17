/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

const express = require('express');
const { login, register, refreshToken, forgotPassword, resetPassword } = require('../controllers/authController');

const router = express.Router();

// Authentication routes
router.post('/login', login);
router.post('/register', register);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
