// Middleware untuk mengecek apakah user sudah login
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
      return next();  // Jika user sudah login, lanjutkan ke route berikutnya
    } else {
      return res.redirect('/');  // Jika user belum login, redirect ke halaman login
    }
  };
  
  module.exports = { isAuthenticated };
  