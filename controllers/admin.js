const Device = require('../models/devices');
const User = require('../models/users');
const UserLogs = require('../models/user-logs');
const Car = require('../models/cars');
const EmgCon = require('../models/emergency-contacts');
const Admin = require('../models/admin');
const DPID = require('../models/diagnosticsPID');
const DTC = require('../models/dtc');
const carDevice = require('../models/car-device');

exports.getIndex = (req, res, next) => {
  const adminId = req.loadedAdmin.adminId;
  Admin.findOne({ where: { id: adminId } })
    .then((admin) => {
      User.findAll()
        .then((users) => {
          Car.findAll()
            .then((cars) => {
              Device.findAll()
                .then((devices) => {
                  res.render('admin/index', {
                    pageTitle: 'Dashboard',
                    path: '/',
                    adminData: admin.username,
                    usersData: users,
                    carsData: cars,
                    devicesData: devices,
                    isAuth: req.loadedAdmin,
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
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
// exports.getIndex = (req, res, next) => {
//     console.log(req.loadedAdmin);
// }

exports.getAddDevice = (req, res, next) => {
  res.render('admin/add-device', {
    pageTitle: 'Add Devices',
    path: '/add-device',
    isAuth: req.loadedAdmin,
  });
};

exports.postAddDevice = (req, res, next) => {
  const macaddress = req.body.macAddress;
  const plateno = req.body.carPlate;
  /* var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var d_ate = h + m; */
  Device.create({
    macAddress: macaddress,
    carPlate: plateno,
  })
    .then((device) => {
      carDevice
        .create({
          /*   date: d_ate, */
          carPlateNo: device.carPlate,
          deviceId: device.id,
        })
        .then((result) => {
          console.log('New Device is Added');
          res.redirect('/tables/devices-table');
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddUser = (req, res, next) => {
  res.render('admin/add-user', {
    pageTitle: 'Add User',
    path: '/add-user',
    isAuth: req.loadedAdmin,
  });
};

exports.postAddUser = (req, res, next) => {
  const userSSN = req.body.SSN;
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const phoneno = req.body.phoneNo;
  const bloodtype = req.body.bloodType;

  User.create({
    SSN: userSSN,
    FirstName: firstname,
    LastName: lastname,
    email: email,
    password: password,
    address: address,
    phoneNo: phoneno,
    bloodType: bloodtype,
  })
    .then((result) => {
      console.log('New User is Added');
      res.redirect('/tables/users-table');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddCar = (req, res, next) => {
  res.render('admin/add-car', {
    pageTitle: 'Add car',
    path: '/add-car',
    isAuth: req.loadedAdmin,
  });
};

exports.postAddCar = (req, res, next) => {
  const plateno = req.body.plateNo;
  const carmodel = req.body.carModel;
  const color = req.body.color;
  const userssn = req.body.userSNN;
  //const deviceid = req.body.deviceID;
  Car.create({
    plateNo: plateno,
    carModel: carmodel,
    color: color,
    userSSN: userssn,
  })
    .then((result) => {
      console.log('New Car is Added');
      res.redirect('/tables/cars-table');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddEmgCon = (req, res, next) => {
  res.render('admin/add-emgCon', {
    pageTitle: 'Add Emergency Contact',
    path: '/add-emgCon',
    isAuth: req.loadedAdmin,
  });
};

exports.postAddEmgCon = (req, res, next) => {
  const phoneno = req.body.phoneNo;
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const address = req.body.address;
  const userssn = req.body.userSNN;
  //const deviceid = req.body.deviceID;
  EmgCon.create({
    phoneNo: phoneno,
    firstName: firstname,
    lastName: lastname,
    address: address,
    userSSN: userssn,
  })
    .then((result) => {
      console.log('New Emergency Contact is Added');
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddDTC = (req, res, next) => {
  res.render('admin/add-dtc', {
    pageTitle: 'Add Diagnostic Trouble Code',
    path: '/add-dtc',
    isAuth: req.loadedAdmin,
  });
};

exports.postAddDTC = (req, res, next) => {
  const code = req.body.code;
  const description = req.body.description;
  DTC.create({
    code: code,
    description: description,
  })
    .then((result) => {
      console.log('New Diagnstic Trouble Code is Added');
      res.redirect('/tables/dtc-table');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddPID = (req, res, next) => {
  res.render('admin/add-pid', {
    pageTitle: 'Add Diagnostic Paramter ID',
    path: '/add-pid',
    isAuth: req.loadedAdmin,
  });
};

exports.postAddPID = (req, res, next) => {
  const pid = req.body.pid;
  const mode = req.body.mode;
  const description = req.body.description;
  var minValue = req.body.minValue;
  var maxValue = req.body.maxValue;
  const unit = req.body.unit;
  if (minValue === '' || maxValue === '') {
    minValue = undefined;
    maxValue = undefined;
    DPID.create({
      PID: pid,
      mode: mode,
      description: description,
      min_value: minValue,
      max_value: maxValue,
      unit: unit,
    })
      .then((result) => {
        console.log('Diagnostic Paramter ID is Added');
        res.redirect('/tables/pid-table');
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    DPID.create({
      PID: pid,
      mode: mode,
      description: description,
      min_value: minValue,
      max_value: maxValue,
      unit: unit,
    })
      .then((result) => {
        console.log('Diagnostic Paramter ID is Added');
        res.redirect('/tables/pid-table');
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.getUsersTable = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.render('tables/users-table', {
        pageTitle: 'Users Table',
        path: '/users-table',
        usersData: users,
        isAuth: req.loadedAdmin,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUserLogs = (req, res, next) => {
  UserLogs.findAll()
    .then((users) => {
      res.render('tables/users-log', {
        pageTitle: 'Users Log Table',
        path: '/users-log',
        usersLogsData: users,
        isAuth: req.loadedAdmin,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getPIDTable = (req, res, next) => {
  DPID.findAll()
    .then((pids) => {
      res.render('tables/pid-table', {
        pageTitle: 'PID Table',
        path: '/pid-table',
        pidsData: pids,
        isAuth: req.loadedAdmin,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDTCTable = (req, res, next) => {
  DTC.findAll()
    .then((dtcs) => {
      res.render('tables/dtc-table', {
        pageTitle: 'DTC Table',
        path: '/dtc-table',
        dtcsData: dtcs,
        isAuth: req.loadedAdmin,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCarsTable = (req, res, next) => {
  Car.findAll()
    .then((cars) => {
      res.render('tables/cars-table', {
        pageTitle: 'Cars Table',
        path: '/cars-table',
        carsData: cars,
        isAuth: req.loadedAdmin,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDevicesTable = (req, res, next) => {
  Device.findAll()
    .then((devices) => {
      res.render('tables/devices-table', {
        pageTitle: 'Devices Table',
        path: '/devices-table',
        devicesData: devices,
        isAuth: req.loadedAdmin,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
