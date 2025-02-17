const db = require("../config/conn");

exports.getBookedSeats = (req, res) => {
    const { ticket_id } = req.query;
    
    if (!ticket_id) {
        return res.status(400).json({ success: false, message: "Ticket ID is required" });
    }

    const query = `
    SELECT A.seat_number 
    FROM ms_order A 
    JOIN transaction B ON B.order_id = A.order_id 
    WHERE A.ticket_id = ?
    AND B.isPaid = "Y"
    `;

    db.query(query, [ticket_id], (err, results) => {
        if (err) {
            console.error("Error fetching booked seats:", err);
            return res.status(500).json({ success: false, message: "Failed to fetch booked seats" });
        }

        // Mengubah hasil query dari JSON string ke array seat
        const bookedSeats = results.flatMap(row => JSON.parse(row.seat_number));
        
        res.json({ success: true, bookedSeats });
    });
};
