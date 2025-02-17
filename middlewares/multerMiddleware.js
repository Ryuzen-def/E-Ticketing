const multer = require("multer");
const path = require("path");

// Konfigurasi penyimpanan hanya dengan nama file
const storage = multer.memoryStorage(); // Tidak menyimpan file di disk

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPG, PNG, and PDF are allowed."));
    }
  },
});

module.exports = upload;
