/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inventory_lots').del();
  
  const now = new Date();
  const futureDate1 = new Date();
  const futureDate2 = new Date();
  const expiringDate = new Date();
  
  // Set future dates for expirations
  futureDate1.setFullYear(futureDate1.getFullYear() + 2); // 2 years from now
  futureDate2.setFullYear(futureDate2.getFullYear() + 1); // 1 year from now
  expiringDate.setDate(expiringDate.getDate() + 30); // 30 days from now
  
  // Insert seed entries
  await knex('inventory_lots').insert([
    {
      id: 1,
      inventory_item_id: 4, // Lidocaine
      lot_number: 'LOT-12345',
      expiry_date: futureDate1,
      quantity: 15,
      supplier: 'MediSupply Inc.',
      invoice_number: 'INV-2025-001',
      received_date: now,
      created_by: 1,
      created_at: now,
      updated_at: now
    },
    {
      id: 2,
      inventory_item_id: 4, // Lidocaine
      lot_number: 'LOT-12346',
      expiry_date: expiringDate, // Soon to expire
      quantity: 10,
      supplier: 'MediSupply Inc.',
      invoice_number: 'INV-2025-002',
      received_date: now,
      created_by: 1,
      created_at: now,
      updated_at: now
    },
    {
      id: 3,
      inventory_item_id: 5, // Dental Implant
      lot_number: 'IMP-78901',
      expiry_date: futureDate2,
      quantity: 8,
      supplier: 'Dental Innovations',
      invoice_number: 'INV-2025-003',
      received_date: now,
      created_by: 1,
      created_at: now,
      updated_at: now
    },
    {
      id: 4,
      inventory_item_id: 5, // Dental Implant
      lot_number: 'IMP-78902',
      expiry_date: futureDate2,
      quantity: 4,
      supplier: 'Dental Innovations',
      invoice_number: 'INV-2025-004',
      received_date: now,
      created_by: 1,
      created_at: now,
      updated_at: now
    },
    {
      id: 5,
      inventory_item_id: 7, // Composite Filling Material
      lot_number: 'CM-34567',
      expiry_date: futureDate1,
      quantity: 6,
      supplier: 'Dental Direct',
      invoice_number: 'INV-2025-005',
      received_date: now,
      created_by: 1,
      created_at: now,
      updated_at: now
    },
    {
      id: 6,
      inventory_item_id: 7, // Composite Filling Material
      lot_number: 'CM-34568',
      expiry_date: expiringDate, // Soon to expire
      quantity: 2,
      supplier: 'Dental Direct',
      invoice_number: 'INV-2025-006',
      received_date: now,
      created_by: 1,
      created_at: now,
      updated_at: now
    },
    {
      id: 7,
      inventory_item_id: 8, // Scalpel
      lot_number: 'SC-56789',
      expiry_date: futureDate2,
      quantity: 30,
      supplier: 'MediSupply Inc.',
      invoice_number: 'INV-2025-007',
      received_date: now,
      created_by: 1,
      created_at: now,
      updated_at: now
    }
  ]);
};
