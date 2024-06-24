const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE
        });

        console.log('MySQL connection successful!');
        await connection.end();
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message);
    }
}

testConnection();
