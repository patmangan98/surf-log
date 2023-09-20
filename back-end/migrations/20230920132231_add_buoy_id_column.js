/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('posts', table => {
    table.string('buoy_id', 128)
  })
};

exports.down = function(knex) {
  return knex.schema.table('posts', table => {
    table.dropColumn('buoy_id')
  })
}

