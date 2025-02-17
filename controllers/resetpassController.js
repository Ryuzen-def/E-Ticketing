const db = require('../config/conn');
const bcrypt = require('bcrypt');

exports.resetPass = async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ error: 'ID and password are required.' });
  }

  try {
    // Hash password sebelum menyimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'UPDATE ms_user SET password = ? WHERE id_user = ?';

    db.query(query, [hashedPassword, id], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'An error occurred while resetting the password.' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }

      res.json({ message: 'Password reset successfully.' });
    });
  } catch (error) {
    console.error('Error hashing password:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
