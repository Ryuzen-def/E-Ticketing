const db = require("../config/conn");

exports.orderTicket = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { ticket_id, passengerName, seatNumbers, grandTotal } = req.body;
    const id_user = req.session.user ? req.session.user.id : null;

    if (!id_user || !ticket_id || !passengerName || !seatNumbers || !grandTotal) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const quantity = seatNumbers.length;
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // Tahun dalam format YY
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Bulan dalam format MM
    const datePrefix = `${year}${month}`; // Format ID (YYMM)

    // Fungsi untuk mendapatkan order_id terakhir
    const getLastOrderId = () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT order_id FROM ms_order ORDER BY order_id DESC LIMIT 1", (err, result) => {
          if (err) return reject(err);
          let newOrderID = 1;
          if (result.length > 0) {
            const lastOrderID = result[0].order_id;
            const lastOrderNumber = parseInt(String(lastOrderID).slice(-5));
            newOrderID = lastOrderNumber + 1;
          }
          resolve(String(newOrderID).padStart(5, "0"));
        });
      });
    };

    // Fungsi untuk mendapatkan transaction_id terakhir
    const getLastTransactionId = () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT transaction_id FROM transaction ORDER BY transaction_id DESC LIMIT 1", (err, result) => {
          if (err) return reject(err);
          let newTransactionID = 1;
          if (result.length > 0) {
            const lastTransactionID = result[0].transaction_id;
            const lastTransactionNumber = parseInt(String(lastTransactionID).slice(-5));
            newTransactionID = lastTransactionNumber + 1;
          }
          resolve(String(newTransactionID).padStart(5, "0"));
        });
      });
    };

    // Fungsi untuk insert ke ms_order
    const insertOrder = (orderId, orderDate) => {
      return new Promise((resolve, reject) => {
        const insertQuery = `
          INSERT INTO ms_order (order_id, id_user, ticket_id, passenger_name, seat_number, quantity, grand_total, order_date) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(
          insertQuery,
          [orderId, id_user, ticket_id, JSON.stringify(passengerName), JSON.stringify(seatNumbers), quantity, grandTotal, orderDate],
          (err) => {
            if (err) return reject(err);
            resolve(orderId);
          }
        );
      });
    };

    // Fungsi untuk insert ke transaction
    const insertTransaction = (transactionId, orderId) => {
      return new Promise((resolve, reject) => {
        const insertQueryTransaction = `
          INSERT INTO transaction (transaction_id, order_id, id_user, ticket_id, grand_total) 
          VALUES (?, ?, ?, ?, ?)
        `;
        db.query(insertQueryTransaction, [transactionId, orderId, id_user, ticket_id, grandTotal], (err) => {
          if (err) return reject(err);
          resolve(transactionId);
        });
      });
    };

    // Generate Order ID & Insert Order
    const orderNumber = await getLastOrderId();
    const orderId = `${datePrefix}${orderNumber}`;
    const orderDate = now.toISOString().slice(0, 19).replace("T", " ");
    
    await insertOrder(orderId, orderDate);

    // Generate Transaction ID & Insert Transaction
    const transactionNumber = await getLastTransactionId();
    const transactionId = `${datePrefix}${transactionNumber}`;
    
    await insertTransaction(transactionId, orderId);

    res.status(201).json({
      success: true,
      message: "Ticket purchased successfully.",
      orderId,
      transactionId,
    });

  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ success: false, message: "Failed to process order." });
  }
};
