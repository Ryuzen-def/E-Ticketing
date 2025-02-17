const db = require("../config/conn");

exports.checkFlight = (req, res) => {
const id_user = req.session.user ? req.session.user.id : null;
  const query = `
      SELECT transaction_id, 
       ticket_id, 
       grand_total,
       proof, 
       CASE WHEN isPaid = "Y" THEN "Paid" 
       WHEN isPaid = "N" THEN "Unpaid" ELSE "Unpaid" END AS isPaid, 
       CASE WHEN transaction_date IS NOT NULL THEN transaction_date 
       WHEN transaction_date IS NULL THEN "No Data Found"
       ELSE "No Data Found" END AS transaction_date
FROM transaction WHERE id_user = ? AND isPaid = "Y"
  `;

  db.query(query, [id_user], (err, results) => {
    if (err) {
      console.error("Error fetching tickets:", err);
      res.status(500).json({ error: "Database query failed" });
    } else {
      console.log("Fetched results:", results); // Log the results to check proof field
      res.json(results);
    }
  });
};
