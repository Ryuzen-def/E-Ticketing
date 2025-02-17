const db = require("../config/conn");  // Import the db object from conn.js

// Model function for getting a ticket by ID
function getTicketById(ticketId, callback) {
  const query = `
    SELECT 
      t.ticket_id AS ticket_id,
      pswt.nama_pesawat AS nama_pesawat,
      r.airport_code_origin AS airport_code_origin,
      airport.country AS country_origin,
      airport.airport_detail AS airport_name_origin,
      r.airport_code_destination AS airport_code_destination,
      airport2.country AS country_destination,
      airport2.airport_detail AS airport_name_destination,
      t.class,
      t.price,
      t.take_off,
      t.arrival
    FROM ms_ticket t
    JOIN ms_pesawat pswt ON t.id_pesawat = pswt.id_pesawat
    JOIN ms_route r ON t.route_id = r.route_id
    JOIN ms_airport airport ON r.airport_code_origin = airport.airport_code
    JOIN ms_airport airport2 ON r.airport_code_destination = airport2.airport_code
    WHERE t.ticket_id = ?
  `;
  
  db.query(query, [ticketId], function(err, rows) {
    if (err) return callback(err);
    callback(null, rows[0]);  // Return the first row if found
  });
}

// Model function for updating a ticket
function updateTicket(ticketId, data, callback) {
  const query = `
      UPDATE ms_ticket
      SET id_pesawat = ?, class = ?, price = ?, take_off = ?, arrival = ?
      WHERE ticket_id = ?
  `;
  db.query(query, [
      data.id_pesawat,
      data.class,
      data.price,
      data.take_off,
      data.arrival,
      ticketId,
  ], function(err, result) {
      if (err) return callback(err);
      callback(null, result.affectedRows > 0);  // Return true if rows were affected
  });
}

// Controller for ticket operations
const ticketController = {
  // Mendapatkan detail tiket berdasarkan ID
  getTicketById: (req, res) => {
    const ticketId = req.params.id;

    getTicketById(ticketId, (err, ticket) => {
      if (err) {
        console.error('Error fetching ticket details:', err);
        return res.status(500).json({ message: 'Failed to fetch ticket details' });
      }

      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }

      res.json({
        ticket_id: ticket.ticket_id,
        nama_pesawat: ticket.nama_pesawat,
        country_origin: ticket.country_origin,
        country_destination: ticket.country_destination,
        airport_code_origin: ticket.airport_code_origin,
        airport_code_destination: ticket.airport_code_destination,
        airport_name_origin: ticket.airport_name_origin,
        airport_name_destination: ticket.airport_name_destination,
        class: ticket.class,
        price: ticket.price,
        takeoff: ticket.take_off,
        landing: ticket.arrival,
      });
    });
  },

  // Update ticket details
  updateTicket: (req, res) => {
    const ticketId = req.params.id;
    const data = {
      nama_pesawat: req.body.nama_pesawat,
      class: req.body.class,
      price: req.body.price,
    };

    updateTicket(ticketId, data, (err, success) => {
      if (err) {
        console.error('Error updating ticket:', err);
        return res.status(500).json({ message: 'Failed to update ticket' });
      }

      if (!success) {
        return res.status(404).json({ message: 'Ticket not found or no changes made' });
      }

      res.json({ message: 'Ticket updated successfully' });
    });
  },
};

module.exports = { ticketController, getTicketById, updateTicket };