const express = require("express");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const app = require("./app.js");

dotenv.config();
const port = process.env.PORT || 5000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

async function startServer() {
  try {
    // Test the connection
    const connection = await pool.getConnection();
    console.log("Connected to the database");
    connection.release();

    // Attach the pool to the app if needed
    app.locals.db = pool;

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}

startServer();
