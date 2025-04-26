const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
    let connection;
    try {
        console.log('Attempting to connect to MySQL...');
        console.log('Trying connection without password first...');

        try {
            // First try without password
            connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER
            });
            console.log('Successfully connected without password!');
        } catch (error) {
            console.log('Connection without password failed, trying with password...');
            // If that fails, try with password
            connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD
            });
            console.log('Successfully connected with password!');
        }

        // Create database if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        console.log(`Database ${process.env.DB_NAME} created or already exists`);

        // Switch to the database
        await connection.query(`USE ${process.env.DB_NAME}`);
        console.log(`Using database ${process.env.DB_NAME}`);

        // Test query
        const [result] = await connection.query('SELECT 1 + 1 AS solution');
        console.log('Test query result:', result);

        await connection.end();
        console.log('Connection closed successfully');
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        if (connection) {
            await connection.end();
        }
        process.exit(1);
    }
}

testConnection(); 