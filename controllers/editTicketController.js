const { getTicketById, updateTicket } = require("../models/ticketModel");  // Import the model functions

// Function to format the price
function formatRupiah(angka) {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Controller for getting a ticket by ID
function getTicketByIdController(req, res) {
    const ticketId = req.params.ticketId;  // Extract ticketId from the URL
    console.log("Requested Ticket ID:", ticketId);  // Log the ticketId
  
    // Now use the model function to get the ticket from the database
    getTicketById(ticketId, (err, ticket) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        
        // Format the price before sending to the view
        ticket.price = formatRupiah(ticket.price); // Format the price

        // If ticket found, render the view with ticket data
        return res.render('ticket-edit', { ticket });  // Assuming 'ticket-edit' is your view's name
    });
}  

// Controller for updating a ticket
function updateTicketController(req, res) {
    const ticketId = req.params.ticketId; // Get the ticketId from the URL parameters
    const data = {};

    // Only add fields to the data object if they are present in the request body
    if (req.body.pesawat) {
        data.id_pesawat = req.body.pesawat; // Update airplane if provided
    }
    if (req.body.class) {
        data.class = req.body.class; // Update class if provided
    }
    if (req.body.price) {
        data.price = req.body.price.replace(/\./g, ''); // Remove dots for database
    }
    if (req.body.takeoff) {
        data.take_off = req.body.takeoff; // Update takeoff time if provided
    }
    if (req.body.landing) {
        data.arrival = req.body.landing; // Update landing time if provided
    }

    // Call the model's updateTicket function
    updateTicket(ticketId, data, (err, success) => {
        if (err) {
            console.error('Error updating ticket:', err);
            return res.status(500).json({ message: 'Failed to update ticket' });
        }

        if (!success) {
            return res.status(404).json({ message: 'Ticket not found or no changes made' });
        }

        // Redirect to the ticket list page after successful update
        return res.redirect('/ticket-list'); // Adjust the path as necessary
    });
}

module.exports = { getTicketByIdController, updateTicketController };