/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

-- Create database
CREATE DATABASE medident_inventory;

-- Connect to the database
\c medident_inventory;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
