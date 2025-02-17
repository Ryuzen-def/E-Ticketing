const db = require("../config/conn");

exports.ticketList = (req, res) => {
  const query = `
      SELECT 
          ms_ticket.*, 
          CONCAT(ms_route.airport_code_origin, " - ", (SELECT airport_detail FROM ms_airport WHERE airport_code = ms_route.airport_code_origin)) AS airport_code_origin,
        CONCAT(ms_route.airport_code_destination, " - ", (SELECT airport_detail FROM ms_airport WHERE airport_code = ms_route.airport_code_destination)) AS airport_code_destination,
          ms_pesawat.nama_pesawat
      FROM ms_ticket
      JOIN ms_route ON ms_ticket.route_id = ms_route.route_id
      JOIN ms_pesawat ON ms_ticket.id_pesawat = ms_pesawat.id_pesawat
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
