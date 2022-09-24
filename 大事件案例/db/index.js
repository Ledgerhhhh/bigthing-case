const mysql2 = require('mysql2');

const db = mysql2.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_database'
})

module.exports = db