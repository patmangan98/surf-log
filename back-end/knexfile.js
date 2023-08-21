// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: process.env.db_client || 'mysql',
  connection: process.env.PG_CONNECTION_STRING || {
    host : process.env.db_host,
    port : process.env.db_port,
    user : process.env.db_user,
    password : process.env.db_password,
    database : process.env.db_database 
  }
}
