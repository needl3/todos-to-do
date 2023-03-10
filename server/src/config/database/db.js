const mysql = require('mysql')

module.exports = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    ssl: {
        rejectUnauthorized: true,
    },
})
