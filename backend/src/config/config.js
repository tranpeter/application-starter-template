/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  
  // Database configuration
  db: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'medident_inventory',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../migrations',
    },
    seeds: {
      directory: '../seeds',
    },
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  
  // Azure AD B2B configuration
  azureAd: {
    tenantId: process.env.AZURE_TENANT_ID,
    clientId: process.env.AZURE_CLIENT_ID,
    clientSecret: process.env.AZURE_CLIENT_SECRET,
    redirectUri: process.env.AZURE_REDIRECT_URI,
  },
};
