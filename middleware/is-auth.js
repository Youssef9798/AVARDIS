const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.redirect('/login');
  }
  const token = req.cookies.token.split(' ')[1];
  if (!token) {
    return res.status(401).redirect('/login');
  }
  const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); //hold until execute
  if (decodedToken) {
    req.loadedAdmin = decodedToken;
    next();
  }
  // if (!req.cookies.token) {
  //   return res.redirect('/login');
  // }
  // next();
};
//let token = req.headers.cookie.split('; ')[1].split('=')[1].replace('Bearer%20', '');
