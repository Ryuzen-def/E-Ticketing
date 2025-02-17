  const db = require('../config/conn'); // Import koneksi database

  const ticketController = {
    // Mendapatkan detail tiket berdasarkan ID
    getTicketById: (req, res) => {
      const ticketId = req.params.id;

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

      db.query(query, [ticketId], (err, results) => {
        if (err) {
          console.error('Error fetching ticket details:', err);
          return res.status(500).json({ message: 'Failed to fetch ticket details' });
        }

        if (results.length === 0) {
          return res.status(404).json({ message: 'Ticket not found' });
        }

        const ticket = results[0];

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
  };

  module.exports = ticketController;
