/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('posts', function(table) {
   
    table.increments('post_id')
      .primary()
      .unsigned()
      .notNullable()
    table.integer('user_id')
      .unsigned()
      .references('user_id')
      .inTable('user')
      .notNullable()
    table.string('post_date')
    table.string('post_description')
    table.string('post_location')
    table.string('WDIR')
    table.string('WSPD')
    table.string('GST')
    table.string('WVHT')
    table.string('DPD')
    table.string('APD')
    table.string('MWD') 
    table.string('PRES')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts')
};
