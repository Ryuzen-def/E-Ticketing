const db = require('../config/conn');

exports.transactionFetch = (req, res) => {
    const query = `
        SELECT transaction_id,
        id_user,
        ticket_id,
        grand_total,
        CASE WHEN isPaid = "Y" THEN "Paid" ELSE "Unpaid" END AS isPaid,
        CASE WHEN transaction_date IS NULL THEN "No Data Found" ELSE transaction_date END AS transaction_date
        FROM transaction
        WHERE isPaid = "Y" AND isConfirmed IS NULL
    `;
  
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching transaction:", err);
            res.status(500).json({ error: "Database query failed" });
        } else {
            res.json(results);
        }
    });
  };

  exports.transactionAccept = (req, res) => {
    const { transaction_id } = req.body; // Perbaiki dari req.query ke req.body

    if (!transaction_id) {
        return res.status(400).json({ error: "Transaction ID is required." });
    }

    const query = `UPDATE transaction SET isConfirmed = "Y" WHERE transaction_id = ?`;

    db.query(query, [transaction_id], (err, results) => {
        if (err) {
            console.error("Error Accepting transaction:", err);
            return res.status(500).json({ error: "Database query failed" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Transaction not found or already confirmed." });
        }

        res.json({
            success: true,
            message: `Transaction ${transaction_id} has been successfully accepted.`,
        });
    });
};
