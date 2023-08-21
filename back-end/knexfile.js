// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: process.env.db_client || 'mysql',
  connection: process.env.PG_CONNECTION_STRING || {
    host : process.env.db_host || 'surflog-db.c3uu9ekphgna.us-east-2.rds.amazonaws.com',
    port : process.env.db_port ||  3306,
    user : process.env.db_user || 'SurflogAdmin',
    password : process.env.db_password || 'JoeDirtGetsClean',
    database : process.env.db_database || 'inital_db'
  }
}
