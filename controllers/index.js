const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();
require("dotenv").config();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "testing",
  password: "123",
  database: "e-ticketing", // Replace with the name from your SQL file
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

// Fetch Users
app.get("/users", (req, res) => {
  const query = "SELECT * FROM ms_user"; 
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching tickets:", err);
      res.status(500).json({ error: "Database query failed" });
    } else {
      res.json(results);
    }
  });
});

// Login endpoint
// app.post("/login", (req, res) => {
//   const { id, password } = req.body;
//   const query = "SELECT * FROM ms_user WHERE id_user = ? AND password = ?"; 
//   db.query(query, [id, password], (err, results) => {
//     if (err) {
//       console.error("Error during Login:", err);
//       res.status(500).json({ error: "Database query failed" });
//     } else {
//       if (results.length > 0) {
//         res.json(results);
//       } else {
//         res.status(401).json({ message: "Invalid credentials" });
//       }
//     }
//   });
// });

// Register endpoint
// app.post("/register", (req, res) => {
//   const { id, name, email, phone, passport, password } = req.body;
//   const query = "INSERT INTO ms_user (id_user, FullName, contact_email, contact_number, passport_id, password) VALUES (?, ?, ?, ?, ?, ?)"; 
//   db.query(query, [id, name, email, phone, passport, password], (err, results) => {
//     if (err) {
//       console.error("Error during Registration:", err);
//       res.status(500).json({ error: "Database query failed" });
//     } else {
//       res.json({ message: "Registration successful" });
//     }
//   });
// });

// Endpoint untuk memeriksa apakah ID atau Passport sudah digunakan
app.get("/check-id", (req, res) => {
  const { id, passport } = req.query; // Ambil parameter 'id' dan 'passport' dari query string

  // Validasi input
  if (!id && !passport) {
    return res.status(400).json({ error: "At least one of ID or passport is required" });
  }

  // Buat query untuk memeriksa ID dan/atau passport
  let query = "SELECT COUNT(*) AS count_id, COUNT(*) AS count_passport FROM ms_user WHERE 1=1";
  const queryParams = [];

  if (id) {
    query += " AND id_user = ?";
    queryParams.push(id);
  }
  if (passport) {
    query += " AND passport_id = ?";
    queryParams.push(passport);
  }

  // Jalankan query
  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Error during ID/passport check:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    // Hasil pengecekan
    const existsId = results[0].count_id > 0;
    const existsPassport = results[0].count_passport > 0;

    res.json({ existsId, existsPassport }); // Kirimkan hasil dalam bentuk JSON
  });
});

// Start the server
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running at`,process.env.PORT);
});