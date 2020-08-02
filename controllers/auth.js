const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
  });
};

exports.postLogin = (req, res, next) => {
  const e_mail = req.body.email;
  const password = req.body.password;
  let loadedAdmin;
  Admin.findOne({ where: { email: e_mail } })
    .then((user) => {
      if (!user) {
        return res.redirect('/login'); //res.status(401).json({message: 'User not allowed'})
      }
      loadedAdmin = user;
      return bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign(
              {
                adminId: loadedAdmin.id,
                adminEmail: loadedAdmin.email,
                validUser: true,
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '1h' }
            );
            res
              .cookie('token', `Bearer ${token}`)
              .cookie('message', 'isAuth')
              .setHeader('x-auth', `${token}`);
            return res.redirect('/');
            //return res.redirect('/?token='+token);
          }
          res.redirect('/login');
        })
        .catch((err) => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'Sign Up',
    path: '/signup',
  });
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const e_mail = req.body.email;
  const password = req.body.password;
  const confirmedPassword = req.body.confirmedPassword;
  Admin.findOne({ where: { email: e_mail } })
    .then((userDoc) => {
      if (userDoc) {
        console.log(userDoc + '1');
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          Admin.create({
            username: username,
            email: e_mail,
            password: hashedPassword,
          })
            .then((user) => {
              return user.save();
            })
            .then((result) => {
              res.status(201).redirect('/login');
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  res.clearCookie('token').clearCookie('message').redirect('/login');
};
