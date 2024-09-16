const mysql = require('mysql2');

// Create a MySQL connection
const mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'owais',
    database: 'task_2',
    multipleStatements: true
});

// Connect to MySQL
mysqlConnection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    } else {
        console.log('Database connected successfully.');
    }
});

module.exports = mysqlConnection;
