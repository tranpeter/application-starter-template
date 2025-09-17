/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inventory_categories').del();
  
  // Insert seed entries
  await knex('inventory_categories').insert([
    {
      id: 1,
      name: 'Supplies',
      description: 'Everyday dental supplies',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'Medications',
      description: 'Medications and anesthetics',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      name: 'Instruments',
      description: 'Dental instruments and tools',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      name: 'Implants',
      description: 'Dental implants and related products',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 5,
      name: 'PPE',
      description: 'Personal protective equipment',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
};
