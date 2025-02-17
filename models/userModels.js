const db = require("../config/conn"); // Mengimpor koneksi ke database

// Fungsi untuk mencari user berdasarkan id_user
exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM ms_user WHERE id_user = ?";
    db.query(query, [id], (err, result) => {
      if (err) reject(err); // Jika ada error, reject promise
      resolve(result[0]);   // Mengembalikan hasil user pertama
    });
  });
};

// Fungsi untuk mencari user berdasarkan kredensial (id dan password)
exports.findByCredentials = (id, password) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM ms_user WHERE id_user = ?";
    db.query(query, [id], async (err, result) => {
      if (err) reject(err);  // Menangani error query
      if (result.length === 0) {
        resolve(null); // Jika tidak ditemukan user, resolve dengan null
      } else {
        const user = result[0];
        const bcrypt = require('bcrypt');
        const match = await bcrypt.compare(password, user.password); // Membandingkan password terenkripsi dengan bcrypt
        if (match) {
          resolve(user); // Jika password cocok, kembalikan user
        } else {
          resolve(null); // Jika password tidak cocok, resolve dengan null
        }
      }
    });
  });
};
