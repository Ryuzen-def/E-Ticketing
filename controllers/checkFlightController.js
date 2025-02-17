const db = require("../config/conn");

exports.checkFlight = (req, res) => {
  // Ambil id_user dan isAdmin dari session
  const id_user = req.session.user ? req.session.user.id : null;
  const isAdmin = req.session.user ? req.session.user.isAdmin : null;

  // Query untuk admin: ambil semua transaksi
  if (isAdmin === "Y") {
    const query = `
      SELECT transaction_id, 
             ticket_id, 
             grand_total,
             proof, 
             isConfirmed,
             CASE WHEN isPaid = "Y" THEN "Paid" 
                  WHEN isPaid = "N" THEN "Unpaid" ELSE "Unpaid" END AS isPaid, 
             CASE WHEN transaction_date IS NOT NULL THEN transaction_date 
                  WHEN transaction_date IS NULL THEN "No Data Found"
                  ELSE "No Data Found" END AS transaction_date
      FROM transaction
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching all transactions:", err);
        return res.status(500).json({ error: "Database query failed" });
      }
      return res.json(results);
    });
  } 
  // Query untuk user biasa: ambil transaksi berdasarkan id_user dan isPaid = "Y"
  else {
    const query = `
      SELECT transaction_id, 
             ticket_id, 
             grand_total,
             proof, 
             isConfirmed,
             CASE WHEN isPaid = "Y" THEN "Paid" 
                  WHEN isPaid = "N" THEN "Unpaid" ELSE "Unpaid" END AS isPaid, 
             CASE WHEN transaction_date IS NOT NULL THEN transaction_date 
                  WHEN transaction_date IS NULL THEN "No Data Found"
                  ELSE "No Data Found" END AS transaction_date
      FROM transaction 
      WHERE id_user = ? AND isPaid = "Y"
    `;

    db.query(query, [id_user], (err, results) => {
      if (err) {
        console.error("Error fetching user transactions:", err);
        return res.status(500).json({ error: "Database query failed" });
      }
      return res.json(results);
    });
  }
};