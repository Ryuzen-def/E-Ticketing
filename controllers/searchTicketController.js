// controllers/searchTicketController.js
const db = require("../config/conn");

exports.ticketList = (req, res) => {
  const query = `
      SELECT 
          * 
      FROM ms_ticket
      WHERE id_ticket = ${req.params.id_ticket}
  `;

  db.query(query, (err, results) => {
      if (err) {
          console.error("Error fetching tickets:", err);
          res.status(500).json({ error: "Database query failed" });
      } else {
          res.json(results);
      }
  });
};
