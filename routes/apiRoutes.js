const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//====================================================
const User = require('../models/users');
const UserLogs = require('../models/user-logs');
const Device = require('../models/devices');
const Car = require('../models/cars');
const EmgContacts = require('../models/emergency-contacts');
const CarDevice = require('../models/car-device');
const DPID = require('../models/diagnosticsPID');
const DTC = require('../models/dtc');
//====================================================
const express = require('express');
const httpStatus = require('http-status-codes');
const router = express.Router();

router.get('/api/users', (req, res, next) => {
  User.findAll()
    .then((users) => {
      if (users) {
        return res.json(users);
      }
      return res.status(404).json({
        statusCode: httpStatus.NOT_FOUND,
        message: 'No thing found',
        error: httpStatus.getStatusText(httpStatus.NOT_FOUND),
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/api/signup-user-data', (req, res, next) => {
  const userSSN = req.body.ssn;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const phoneNo = req.body.phoneNo;
  const bloodType = req.body.bloodType;

  User.findOne({ where: { SSN: userSSN } })
    .then((user) => {
      if (user) {
        return res.json({
          statusCode: httpStatus.CONFLICT,
          message: 'User is already exist.',
          error: httpStatus.getStatusText(httpStatus.CONFLICT),
        });
      }
      return User.create({
        SSN: userSSN,
        FirstName: firstName,
        LastName: lastName,
        email: email,
        password: password,
        address: address,
        phoneNo: phoneNo,
        bloodType: bloodType,
      })
        .then((result) => {
          res.cookie('userSSN', `${result.SSN}`);
          return res.status(201).json(result);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/api/signup-car-data', (req, res, next) => {
  const plateNo = req.body.plateNo;
  const carmodel = req.body.carModel;
  const color = req.body.color;
  const userssn = req.cookies.userSSN; //token afdal

  Car.findOne({ where: { plateNo: plateNo } })
    .then((car) => {
      if (car) {
        return res.json({
          statusCode: httpStatus.CONFLICT,
          message: 'Car is already exist.',
          error: httpStatus.getStatusText(httpStatus.CONFLICT),
        });
      }
      return Car.create({
        plateNo: plateNo,
        carModel: carmodel,
        color: color,
        userSSN: userssn,
      })
        .then((result) => {
          return res.status(201).json(result);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/api/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const location = req.body.location;

  User.findOne({ where: { email: email, password: password } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          statusCode: httpStatus.UNAUTHORIZED,
          message: 'Non Authorized login',
          error: httpStatus.getStatusText(httpStatus.UNAUTHORIZED),
        });
      }
      UserLogs.create({
        email: user.email,
        password: user.password,
        location: location,
      })
        .then((result) => {
          return res.json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
