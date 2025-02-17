const db = require("../config/conn"); // Import database connection
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Untuk tetap mendukung JSON

// Controller untuk register
exports.register = async (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Request Query:", req.query);

    const { id, name, email, phone, passport, password } = {
        ...req.body,
        ...req.query,
    };
          
    // Validasi semua field
    if (!id || !name || !email || !phone || !passport || !password) {
        console.error("Missing required fields:", { id, name, email, phone, passport, password });
        return res.status(400).json({ error: "All fields are required." });
    }

    // Validasi panjang password
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO ms_user 
            (id_user, FullName, contact_email, contact_number, passport_id, password, isAdmin) 
            VALUES (?, ?, ?, ?, ?, ?, "N")
        `;

        db.query(query, [id, name, email, phone, passport, hashedPassword], (err) => {
            if (err) {
                console.error("Error during Registration:", err.message, err.stack);
                const isDuplicate = err.code === "ER_DUP_ENTRY";
                return res.status(500).json({
                    error: isDuplicate ? "ID or email already exists." : "Registration failed. Please try again."
                });
            }

            res.status(200).json({ message: "Registration successful!" });
        });
    } catch (error) {
        console.error("Error hashing password:", error.message, error.stack);
        res.status(500).json({ error: "Internal server error. Please try again." });
    }
};