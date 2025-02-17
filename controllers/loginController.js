const db = require("../config/conn");
const bcrypt = require("bcrypt");

exports.handleLogin = (req, res) => {
  const { id, password } = req.body;

  // Validasi input untuk memastikan ID dan password ada
  if (!id || !password) {
    return res.status(400).json({ error: "ID and password are required." });
  }

  // Query untuk mencari user berdasarkan ID
  const query = "SELECT * FROM ms_user WHERE id_user = ?";

  db.query(query, [id], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error." });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const user = results[0];

    // Membandingkan password yang diberikan dengan password yang tersimpan di database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Menyimpan data user di session (cookie)
    req.session.user = { id: user.id_user, name: user.FullName, isAdmin: user.isAdmin };

    // Mengirim response sukses beserta data user
    res.json({ message: "Login successful.", user: req.session.user });
    console.log(req.session);  // Log the session to see if it's being set
  });
};

exports.handleLogout = (req, res) => {
  // Menghapus session untuk logout
  req.session = null;

  // Mengirimkan response logout sukses
  res.json({ message: "Logout successful." });
};

exports.getSessionUser = (req, res) => {
  if (!req.session.user) {
      return res.status(401).json({ success: false, message: "Not logged in." });
  }

  res.status(200).json({ success: true, user: req.session.user });
};