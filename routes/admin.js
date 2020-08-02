const express = require('express');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/', isAuth, adminController.getIndex);

router.get('/admin/add-device', isAuth, adminController.getAddDevice);
router.post('/admin/add-device', isAuth, adminController.postAddDevice);

router.get('/admin/add-user', isAuth, adminController.getAddUser);
router.post('/admin/add-user', isAuth, adminController.postAddUser);

router.get('/admin/add-car', isAuth, adminController.getAddCar);
router.post('/admin/add-car', isAuth, adminController.postAddCar);

router.get('/admin/add-emgCon', isAuth, adminController.getAddEmgCon);
router.post('/admin/add-emgCon', isAuth, adminController.postAddEmgCon);

router.get('/admin/add-dtc', isAuth, adminController.getAddDTC);
router.post('/admin/add-dtc', isAuth, adminController.postAddDTC);

router.get('/admin/add-pid', isAuth, adminController.getAddPID);
router.post('/admin/add-pid', isAuth, adminController.postAddPID);

router.get('/tables/users-table', isAuth, adminController.getUsersTable);

router.get('/tables/users-log', isAuth, adminController.getUserLogs);

router.get('/tables/pid-table', isAuth, adminController.getPIDTable);

router.get('/tables/dtc-table', isAuth, adminController.getDTCTable);

router.get('/tables/cars-table', isAuth, adminController.getCarsTable);

router.get('/tables/devices-table', isAuth, adminController.getDevicesTable);

module.exports = router;
