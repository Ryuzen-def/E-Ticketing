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

const payTransaction = async (req, res) => {
  try {
    const { transactionId, payment_method } = req.body;
    const id_user = req.session.user ? req.session.user.id : null;
    const transaction_date = new Date().toISOString().slice(0, 19).replace("T", " ");

    if (!transactionId || !id_user || !payment_method) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    let proofFileName = null;
    if (req.file) {
      proofFileName = req.file.originalname; // Hanya menyimpan nama file
    } else {
      return res.status(400).json({ success: false, message: "Payment proof is required." });
    }

    db.query(
      `UPDATE transaction 
       SET payment_method = ?, proof = ?, transaction_date = ?, isPaid = "Y"
       WHERE transaction_id = ? AND id_user = ?`,
      [payment_method, proofFileName, transaction_date, transactionId, id_user],
      (err, result) => {
        if (err) {
          console.error("Database update error:", err);
          return res.status(500).json({ success: false, message: "Failed to process transaction." });
        }

        res.status(201).json({
          success: true,
          message: "Transaction has been successfully paid!",
          transactionId,
          proofFileName,
        });
      }
    );
  } catch (error) {
    console.error("Error processing transaction:", error);
    res.status(500).json({ success: false, message: "Failed to process transaction." });
  }
};



const transactionController = {
  getTransactionByIdController,
  payTransaction,
};

module.exports = transactionController;
