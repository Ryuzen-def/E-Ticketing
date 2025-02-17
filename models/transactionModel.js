const db = require("../config/conn");  // Import the db object from conn.js

// Model function for getting a ticket by ID
function getTransactionById(orderId, ticketId, callback) {
  const query = `
    SELECT 
    B.order_id,
    B.ticket_id AS ticket_id,
    B.passenger_name,
    (SELECT nama_pesawat from ms_pesawat WHERE id_pesawat = A.id_pesawat) AS id_pesawat,
    CONCAT(C.airport_code_origin, " - ", (SELECT airport_detail FROM ms_airport WHERE airport_code = c.airport_code_origin)) AS departure_code,
    CONCAT(C.airport_code_destination, " - ", (SELECT airport_detail FROM ms_airport WHERE airport_code = c.airport_code_destination)) AS arrival_code,
    CASE WHEN A.class = 'Premium' Then 'Premium Economy' ELSE CONCAT(A.class, " Class") END AS class,
    B.seat_number,
    B.quantity,
    A.price,
    B.grand_total
    from ms_order B
    JOIN ms_ticket A ON A.ticket_id = B.ticket_id 
    JOIN ms_route C ON C.route_id = A.route_id
    AND B.order_id = ?
    AND B.ticket_id = ?
 
  `;

  db.query(query, [orderId, ticketId], function(err, rows) {
    if (err) return callback(err);
    callback(null, rows[0]);  // Return the first row if found
  });
}

module.exports = { getTransactionById };