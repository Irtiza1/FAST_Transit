import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); 


const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    const conn = await connection.getConnection();
    console.log('Database connected successfully using connection pool.');
    conn.release(); 
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

testConnection();

export default connection;
