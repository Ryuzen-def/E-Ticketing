const db = require("../config/conn");

exports.checkFlight = (req, res) => {
  const isAdmin = req.session.user && req.session.user.role === "admin"; // Check if the user is an admin
  const id_user = req.session.user ? req.session.user.id : null;

  let query;
  let params = [];

  if (isAdmin) {
    // If the user is an admin, fetch all transactions regardless of the user ID
    query = `
      SELECT 
        transaction_id, 
        ticket_id, 
        grand_total, 
        CASE 
          WHEN isPaid = "Y" THEN "Paid" 
          WHEN isPaid = "N" THEN "Unpaid" 
          ELSE "Unpaid" 
        END AS isPaid, 
        CASE 
          WHEN transaction_date IS NOT NULL THEN transaction_date 
          ELSE "No Data Found" 
        END AS transaction_date,
        id_user
      FROM transaction
    `;
  } else {
    // If the user is not an admin, fetch only their transactions
    query = `
      SELECT 
        transaction_id, 
        ticket_id, 
        grand_total, 
        CASE 
          WHEN isPaid = "Y" THEN "Paid" 
          WHEN isPaid = "N" THEN "Unpaid" 
          ELSE "Unpaid" 
        END AS isPaid, 
        CASE 
          WHEN transaction_date IS NOT NULL THEN transaction_date 
          ELSE "No Data Found" 
        END AS transaction_date
      FROM transaction 
      WHERE id_user = ? AND isPaid = "Y"
    `;
    params = [id_user];
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching tickets:", err);
      res.status(500).json({ error: "Database query failed" });
    } else {
      res.json(results);
    }
  });
};