const mysql = require('mysql')


const db = mysql.createConnection({
    host : process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})


db.connect((err) => {
    if (err) {
        console.error(err)
        return;
    }
    console.log(`database connected`)
})
// Access the variables
// const {
//     DB_HOST,
//     DB_PORT,
//     DB_USER,
//     DB_PASSWORD,
//     DB_NAME
// } = process.env;

// Use these variables to establish a database connection
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// connection.on('connected', function () {
//     console.log(`Connected to ${connection.database} at ${connection.host}:${connection.port}`)
// })
