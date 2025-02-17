  const multer = require("multer");
  const path = require("path");
  const fs = require("fs");

  // Konfigurasi penyimpanan file
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = path.join(__dirname, "../storage/image"); // Gunakan path absolut
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true }); // Buat folder jika belum ada
      }
      cb(null, dir); // Simpan file di folder ini
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Nama file unik
    },
  });

  // Filter untuk membatasi jenis file yang diizinkan
  const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // File diterima
    } else {
      cb(new Error("Jenis file tidak valid. Hanya JPG, PNG, dan PDF yang diizinkan."), false); // File ditolak
    }
  };

  // Konfigurasi Multer
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // Batas ukuran file (5MB)
    },
  });

  module.exports = upload;