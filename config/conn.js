const mysql = require("mysql");

// Database configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "testing",
  password: "123",
  database: "e-ticketing",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

module.exports = db;