const { getTicketById } = require("../models/ticketModel");  // Import the model functions

function getTicketByIdControl(req, res) {
    const ticketId = req.params.ticketId;  // Extract ticketId from the URL
    //console.log("Requested Ticket ID:", ticketId);  // Log the ticketId
  
    // Now use the model function to get the ticket from the database
    getTicketById(ticketId, (err, ticket) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        // Convert takeoff and landing to Date objects
        const takeoffDate = new Date(ticket.take_off);
        const landingDate = new Date(ticket.arrival);

        // Check if the dates are valid
        if (isNaN(takeoffDate.getTime()) || isNaN(landingDate.getTime())) {
            console.error("Invalid date format for takeoff or landing");
            return res.status(400).json({ message: "Invalid date format" });
        }

        // Format takeoff and landing to dd/mm/yy HH:MM
        const formatDateTime = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        };

        // Format the date to DDD, DD MMM YYYY
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
        const formattedDate = takeoffDate.toLocaleDateString('en-US', options).replace(',', ''); // Format the date

        const formattedTicket = {
            ...ticket,
            takeoff: formatDateTime(takeoffDate), // Format takeoff
            landing: formatDateTime(landingDate), // Format landing
            date: formattedDate, // Use the formatted date directly
        };

        // If ticket found, render the view with ticket data
        return res.render('buy-ticket', { ticket: formattedTicket });  // Render the view with the formatted ticket data
    });
}  

module.exports = { getTicketByIdControl };