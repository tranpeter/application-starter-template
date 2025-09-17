/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inventory_items').del();
  
  const now = new Date();
  
  // Insert seed entries
  await knex('inventory_items').insert([
    {
      id: 1,
      name: 'Nitrile Gloves - Small',
      sku: 'GLV-001',
      category_id: 5,
      quantity: 500,
      minimum_quantity: 100,
      unit: 'pairs',
      location: 'Cabinet A',
      notes: 'Blue nitrile examination gloves, powder-free',
      requires_lot_tracking: false,
      is_active: true,
      created_by: 1,
      updated_by: 1,
      created_at: now,
      updated_at: now
    },
    {
      id: 2,
      name: 'Nitrile Gloves - Medium',
      sku: 'GLV-002',
      category_id: 5,
      quantity: 750,
      minimum_quantity: 150,
      unit: 'pairs',
      location: 'Cabinet A',
      notes: 'Blue nitrile examination gloves, powder-free',
      requires_lot_tracking: false,
      is_active: true,
      created_by: 1,
      updated_by: 1,
      created_at: now,
      updated_at: now
    },
    {
      id: 3,
      name: 'Nitrile Gloves - Large',
      sku: 'GLV-003',
      category_id: 5,
      quantity: 400,
      minimum_quantity: 100,
      unit: 'pairs',
      location: 'Cabinet A',
      notes: 'Blue nitrile examination gloves, powder-free',
      requires_lot_tracking: false,
      is_active: true,
      created_by: 1,
      updated_by: 1,
      created_at: now,
      updated_at: now
    },
    {
      id: 4,
      name: 'Lidocaine 2% with Epinephrine',
      sku: 'MED-001',
      category_id: 2,
      quantity: 25,
      minimum_quantity: 10,
      unit: 'vials',
      location: 'Medication Cabinet',
      notes: 'Keep refrigerated',
      requires_lot_tracking: true,
      is_active: true,
      created_by: 1,
      updated_by: 1,
      created_at: now,
      updated_at: now
    },
    {
      id: 5,
      name: 'Dental Implant - 4.0mm x 10mm',
      sku: 'IMP-001',
      category_id: 4,
      quantity: 12,
      minimum_quantity: 5,
      unit: 'pieces',
      location: 'Secure Cabinet',
      notes: 'Titanium dental implants',
      requires_lot_tracking: true,
      is_active: true,
      created_by: 1,
      updated_by: 1,
      created_at: now,
      updated_at: now
    },
    {
      id: 6,
      name: 'Cotton Rolls',
      sku: 'SUP-001',
      category_id: 1,
      quantity: 1000,
      minimum_quantity: 200,
      unit: 'pieces',
      location: 'Drawer B',
      notes: '2" cotton rolls',
      requires_lot_tracking: false,
      is_active: true,
      created_by: 1,
      updated_by: 1,
      created_at: now,
      updated_at: now
    },
    {
      id: 7,
      name: 'Composite Filling Material - A2',
      sku: 'SUP-002',
      category_id: 1,
      quantity: 8,
      minimum_quantity: 3,
      unit: 'syringes',
      location: 'Drawer C',
      notes: 'Light-cured resin composite',
      requires_lot_tracking: true,
      is_active: true,
      created_by: 1,
      updated_by: 1,
      created_at: now,
      updated_at: now
    },
    {
      id: 8,
      name: 'Scalpel #15',
      sku: 'INS-001',
      category_id: 3,
      quantity: 30,
      minimum_quantity: 10,
      unit: 'pieces',
      location: 'Instrument Cabinet',
      notes: 'Sterile, single-use',
      requires_lot_tracking: true,
      is_active: true,
      created_by: 1,
      updated_by: 1,
      created_at: now,
      updated_at: now
    }
  ]);
};
