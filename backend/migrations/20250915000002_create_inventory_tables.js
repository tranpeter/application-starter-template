/**
 * Copyright (c) 2025 MediDent Inventory Manager
 */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // Categories table
    .createTable('inventory_categories', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.string('description').nullable();
      table.timestamps(true, true);
    })
    
    // Inventory items table
    .createTable('inventory_items', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('sku').notNullable().unique();
      table.integer('category_id').unsigned().references('id').inTable('inventory_categories');
      table.decimal('quantity', 10, 2).defaultTo(0);
      table.decimal('minimum_quantity', 10, 2).defaultTo(0);
      table.string('unit').defaultTo('units');
      table.string('location').nullable();
      table.text('notes').nullable();
      table.boolean('requires_lot_tracking').defaultTo(false);
      table.boolean('is_active').defaultTo(true);
      table.integer('created_by').unsigned().references('id').inTable('users');
      table.integer('updated_by').unsigned().references('id').inTable('users');
      table.timestamps(true, true);
    })
    
    // Lot numbers table
    .createTable('inventory_lots', (table) => {
      table.increments('id').primary();
      table.integer('inventory_item_id').unsigned().notNullable().references('id').inTable('inventory_items');
      table.string('lot_number').notNullable();
      table.date('expiry_date').nullable();
      table.decimal('quantity', 10, 2).defaultTo(0);
      table.string('supplier').nullable();
      table.string('invoice_number').nullable();
      table.date('received_date').nullable();
      table.integer('created_by').unsigned().references('id').inTable('users');
      table.timestamps(true, true);
      
      // Composite unique constraint
      table.unique(['inventory_item_id', 'lot_number']);
    })
    
    // Inventory audit logs
    .createTable('inventory_audit_logs', (table) => {
      table.increments('id').primary();
      table.integer('inventory_item_id').unsigned().notNullable().references('id').inTable('inventory_items');
      table.integer('lot_id').unsigned().nullable().references('id').inTable('inventory_lots');
      table.decimal('previous_quantity', 10, 2).notNullable();
      table.decimal('new_quantity', 10, 2).notNullable();
      table.decimal('change_amount', 10, 2).notNullable();
      table.enum('action_type', ['manual', 'invoice', 'scan', 'qr', 'csv_import', 'adjustment']).defaultTo('manual');
      table.string('reason').nullable();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    
    // QR codes table
    .createTable('qr_codes', (table) => {
      table.increments('id').primary();
      table.integer('inventory_item_id').unsigned().references('id').inTable('inventory_items');
      table.integer('lot_id').unsigned().nullable().references('id').inTable('inventory_lots');
      table.string('code').notNullable().unique();
      table.enum('type', ['permanent', 'lot']).defaultTo('permanent');
      table.boolean('is_active').defaultTo(true);
      table.integer('created_by').unsigned().references('id').inTable('users');
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('qr_codes')
    .dropTableIfExists('inventory_audit_logs')
    .dropTableIfExists('inventory_lots')
    .dropTableIfExists('inventory_items')
    .dropTableIfExists('inventory_categories');
};
