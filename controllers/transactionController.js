const db = require("../config/conn");
const { getTransactionById } = require("../models/transactionModel");

// Format harga ke Rupiah (tidak diubah)
function formatRupiah(angka) {
  return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function getTransactionByIdController(req, res) {
  const orderId = req.params.orderId;
  const ticketId = req.params.ticketId;
  console.log("Requested Order Id:", orderId, "Ticket ID:", ticketId);

  getTransactionById(orderId, ticketId, (err, transaction) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!transaction) {
      return res.status(404).json({ message: "Data not found" });
    }

    // Format harga ke Rupiah
    transaction.price = formatRupiah(transaction.price);
    transaction.grand_total = formatRupiah(transaction.grand_total);
    transaction.quantity = formatRupiah(transaction.quantity);

    return res.render("transaction-entry", { transaction });
  });
}

const payTransaction = async (req, res, next) => {
  try {
    // Validasi input
    const { transactionId, payment_method } = req.body;
    const id_user = req.session.user?.id;

    if (!transactionId || !id_user || !payment_method) {
      return res.status(400).json({ success: false, message: "Semua field wajib diisi." });
    }

    // Validasi file upload
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Bukti pembayaran wajib diunggah." });
    }

    // Path file yang diunggah
    const proofFilePath = `/storage/image/${req.file.filename}`;

    // Query untuk memperbarui transaksi di database
    const query = `
      UPDATE transaction 
      SET payment_method = ?, proof = ?, transaction_date = NOW(), isPaid = 'Y'
      WHERE transaction_id = ? AND id_user = ?
    `;

    // Eksekusi query
    db.query(
      query,
      [payment_method, proofFilePath, transactionId, id_user],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ success: false, message: "Gagal memproses pembayaran." });
        }

        // Jika berhasil
        res.status(200).json({
          success: true,
          message: "Pembayaran berhasil diproses!",
          data: {
            transactionId,
            proofFilePath,
          },
        });
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan server." });
  }
};



const transactionController = {
  getTransactionByIdController,
  payTransaction,
};

module.exports = transactionController;
