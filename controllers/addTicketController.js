const db = require("../config/conn");


exports.maskapaiList = (req, res) => {
    const query = "SELECT * FROM ms_pesawat"; ``
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching tickets:", err);
        res.status(500).json({ error: "Database query failed" });
      } else {
        res.json(results);
      }
    });
}

exports.airportList = (req, res) => {
    const query = "SELECT * FROM ms_airport"; 
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching tickets:", err);
        res.status(500).json({ error: "Database query failed" });
      } else {
        res.json(results);
      }
    });
}

// Endpoint untuk mendapatkan airport berdasarkan country
exports.getAirportsByCountry = (req, res) => {
  const { country } = req.query;
  const query = "SELECT * FROM ms_airport WHERE country = ?";
  db.query(query, [country], (err, results) => {
      if (err) {
          console.error("Error fetching airports:", err);
          return res.status(500).json({ error: "Database query failed" });
      }
      res.json(results);
  });
};

// Endpoint untuk mendapatkan airport berdasarkan country
exports.getAirportsByCountry = (req, res) => {
  const { country } = req.query;
  const query = "SELECT * FROM ms_airport WHERE country = ?";
  db.query(query, [country], (err, results) => {
      if (err) {
          console.error("Error fetching airports:", err);
          return res.status(500).json({ error: "Database query failed" });
      }
      res.json(results);
  });
};

exports.routeMaster = (req, res) => {
    const query = "SELECT * FROM ms_route"; 
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching tickets:", err);
        res.status(500).json({ error: "Database query failed" });
      } else {
        res.json(results);
      }
    });
}

const getRouteId = async (airportCodeOrigin, airportCodeDestination) => {
  try {
      const result = await pool.query(
          'SELECT route_id FROM ms_route WHERE airport_code_origin = $1 AND airport_code_destination = $2',
          [airportCodeOrigin, airportCodeDestination]
      );
      if (result.rows.length > 0) {
          return result.rows[0].route_id;
      } else {
          throw new Error('Route not found');
      }
  } catch (error) {
      throw error;
  }
};


exports.addTicket = (req, res) => {
  const { pswt, airportfrom, airportto, class: flightClass, takeoff, landing, price } = req.body;

  // Validasi input
  if (!pswt || !airportfrom || !airportto || !flightClass || !takeoff || !landing || !price) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  // Ambil tahun, bulan, dan tanggal dari takeoff
  const takeoffDate = new Date(takeoff);
  const year = takeoffDate.getFullYear();
  const month = String(takeoffDate.getMonth() + 1).padStart(2, '0');
  
  // Format tahun dalam dua digit (YY)
  const yearPrefix = String(year).slice(-2);

  // Format tanggal penerbangan dalam bentuk YYMM
  const datePrefix = `${yearPrefix}${month}`;

  // Query untuk mencari tiket dengan tanggal yang sama
  const query = `
      SELECT ticket_id FROM ms_ticket
      WHERE ticket_id LIKE ? ORDER BY ticket_id DESC LIMIT 1
  `;

  db.query(query, [`${datePrefix}%`], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Failed to generate ticket_id." });
    }

    let newTicketNumber = 1;
    if (result.length > 0) {
      const lastTicketId = result[0].ticket_id;
      const lastTicketNumber = parseInt(String(lastTicketId).slice(-5));
      newTicketNumber = lastTicketNumber + 1;
    }

    const ticketNumber = String(newTicketNumber).padStart(5, '0');
    const ticketId = `${datePrefix}${ticketNumber}`;

    const insertQuery = `
        INSERT INTO ms_ticket 
        (ticket_id, id_pesawat, route_id, class, take_off, arrival, price) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const routeQuery = `
        SELECT route_id FROM ms_route
        WHERE airport_code_origin = ? AND airport_code_destination = ?
    `;

    db.query(routeQuery, [airportfrom, airportto], (err, routeResult) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ success: false, message: "Failed to find route." });
      }

      if (routeResult.length === 0) {
        return res.status(404).json({ success: false, message: "Route not found for the given airports." });
      }

      const route_id = routeResult[0].route_id;

      db.query(insertQuery, [ticketId, pswt, route_id, flightClass, takeoff, landing, price], (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ success: false, message: "Failed to insert ticket." });
        }

        // Respons sukses
        res.status(201).json({ success: true, message: "Ticket added successfully.", ticketId: ticketId });
      });
    });
  });
};
