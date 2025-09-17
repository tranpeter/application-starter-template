/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const { errorHandler, notFoundHandler } = require('./middlewares/errorMiddleware');
const config = require('./config/config');
const logger = require('./utils/logger');

// Import routes
const authRoutes = require('./routes/authRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(compression());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = config.port || 5000;
app.listen(PORT, () => {
  logger.info(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});

module.exports = app; // For testing
