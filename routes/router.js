const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const usersController = require('../controllers/usersController');
const resetpassController = require('../controllers/resetpassController');
const ticketingController = require('../controllers/ticketingController');
const addTicketController = require('../controllers/addTicketController');
const { isAuthenticated } = require('../middlewares/authMiddleware'); // Mengimpor middleware isAuthenticated
const ticketController = require('../controllers/ticketController');
const editTicketController = require('../controllers/editTicketController');
const transactionController = require('../controllers/transactionController');
const orderController = require('../controllers/orderController');
const getTicketByIdControl = require('../controllers/getTicketBuy');
const getBookedSeatsController = require('../controllers/getBookedSeatsController');
const getTransactionByIdController = require('../controllers/transactionController');
const confirmController = require('../controllers/confirmController');
const checkFlightController = require('../controllers/checkFlightController');
const upload = require("../middlewares/upload"); // Import middleware upload

// Define the route

router.post('/login', loginController.handleLogin);
router.post('/registration', registerController.register);
router.post('/resetpass', resetpassController.resetPass);
router.post('/addTicket', addTicketController.addTicket);
// router.post('/transaction-entry', transactionController.transactionHandler);
router.post('/order-ticket', orderController.orderTicket);
router.post(
  "/pay-complete",
  upload.single("proof"), // This should match the field name in the form
  transactionController.payTransaction
);
router.post('/accept-transaction', confirmController.transactionAccept);

router.get('/ticketing', ticketingController.ticketList);
router.get('/checkflight', checkFlightController.checkFlight);
router.get('/confirmTransaction', confirmController.transactionFetch);
router.get('/users', usersController.userList);
router.get('/logout', loginController.handleLogout);
router.get("/session", loginController.getSessionUser);
router.get('/maskapai', addTicketController.maskapaiList);
router.get('/airport', addTicketController.airportList);
router.get('/route', addTicketController.routeMaster);
router.get('/airportsByCountry', addTicketController.getAirportsByCountry);
router.get("/booked-seats", getBookedSeatsController.getBookedSeats);




router.get('/register', (req, res) => {
    res.render('register');
}); // Untuk API pendaftaran

// Add more routes as needed
router.get('/', (req, res) => {
    res.render('login'); // Example route for the root
});

router.get('/reset-password', (req, res) => {
  res.render('forgot-pass'); // Example route for the root
});

router.get('/index', isAuthenticated, (req, res) => {
  res.render('index', { user: req.session.user });
});

router.get('/ticket-entry', isAuthenticated, (req, res) => {
  res.render('ticket-entry', { user: req.session.user });
});

router.get('/ticket-list', isAuthenticated, (req, res) => {
  res.render('ticketing', { user: req.session.user });
});

router.get('/transaction', isAuthenticated, (req, res) => {
  res.render('transaction-entry', { user: req.session.user });
});

router.get('/check-flight', isAuthenticated, (req, res) => {
  res.render('check-flight', { user: req.session.user });
});

router.get('/book-flight', isAuthenticated, (req, res) => {
  res.render('book-flight', { user: req.session.user });
});

router.get('/confirm-admin', isAuthenticated, (req, res) => {
  res.render('confirm-flight', { user: req.session.user });
});

router.get('/homepage', isAuthenticated, (req, res) => {
  res.render('homepage', { user: req.session.user });
});

router.get('/contact', isAuthenticated, (req, res) => {
  res.render('contact', { user: req.session.user });
});

router.get('/buy-ticket/:ticketId', isAuthenticated, getTicketByIdControl.getTicketByIdControl);

// Route handling in routes file
router.get('/ticket-edit/:ticketId', editTicketController.getTicketByIdController);
router.post('/ticket-edit/:ticketId', editTicketController.updateTicketController);

router.get('/transaction/:orderId&:ticketId', getTransactionByIdController.getTransactionByIdController);

router.get('/ticket/:id', ticketController.getTicketById);
// router.get('/transaction/:id', ticketController.getTicketById);

module.exports = router;