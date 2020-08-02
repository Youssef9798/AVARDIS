module.exports = async (req, res, next) => {
  if (req.cookies.message) {
    return res.redirect('/');
  }
  next();
};
