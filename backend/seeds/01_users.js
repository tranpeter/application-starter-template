/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

const bcrypt = require('bcryptjs');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  
  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('password123', salt);
  
  // Insert seed entries
  await knex('users').insert([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@medident.com',
      password: password,
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'Office Manager',
      email: 'manager@medident.com',
      password: password,
      role: 'manager',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      name: 'Dental Assistant',
      email: 'assistant@medident.com',
      password: password,
      role: 'assistant',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
};
