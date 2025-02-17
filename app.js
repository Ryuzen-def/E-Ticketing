// Import dependencies
const express = require('express');
const cookieSession = require('cookie-session');
const path = require('path');
const router = require('./routes/router'); // Import router
const db = require("./config/conn");
const app = express();
require('dotenv').config();

// Middleware untuk parsing JSON dan URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));


// Konfigurasi cookie-session
app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET], // Pastikan SESSION_SECRET ada di file .env
    maxAge: 24 * 60 * 60 * 1000, // 1 hari
    httpOnly: true,
    secure: false, // Jika Anda menggunakan HTTPS, set ke `true`
}));

// Router harus dipasang setelah session diinisialisasi
app.use(router);

// Set EJS sebagai view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set direktori static untuk file statis (misalnya CSS, JS)
app.use(express.static(path.join(__dirname, 'src')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.use("/uploads", express.static("uploads"));
