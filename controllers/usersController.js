const db = require("../config/conn");

exports.userList = (req, res) => {
    const query = "SELECT * FROM ms_user"; 
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Database query failed" });
      } else {
        res.json(results);
      }
    });
};