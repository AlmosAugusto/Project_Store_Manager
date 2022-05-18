// Renomeie esse arquivo
const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 1234,
  database: process.env.MYSQL_DATABASE || 'StoreManager',
});

module.exports = connection;