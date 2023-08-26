// Update with your config settings.
require('dotenv').config()
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
    
      // client: process.env.db_client || 'mysql2',
      // connection:  {
      //   host : process.env.db_host || '127.0.0.1',
      //   port : process.env.db_port ||  3306,
      //   user : process.env.db_user || 'root',
      //   database : process.env.db_database || 'surf-log'
      // }
      
      client: process.env.db_client || 'mysql2',
      connection:  {
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        user : process.env.DB_USER, 
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME  
      }
}





