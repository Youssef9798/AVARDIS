// Core Modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//const session = require('express-session');
//const SequelizeStore = require('connect-session-sequelize')(session.Store);
//=====================================================================================//
const sequelize = require('./util/database');
const app = express();
/*const store = new SequelizeStore({
    db: sequelize
});*/

// Render views engine Setup
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cookieParser());
//=====================================================================================//

// Created Modules
//=====================================================================================//

//================================ Routes imported ====================================//
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/apiRoutes');
const errorController = require('./controllers/error');
//=====================================================================================//

//================================ Importing Models ===================================//
const Admin = require('./models/admin');
const Device = require('./models/devices');
const User = require('./models/users');
const UserLogs = require('./models/user-logs');
const Car = require('./models/cars');
const EmgContacts = require('./models/emergency-contacts');
const CarDevice = require('./models/car-device');
const DPID = require('./models/diagnosticsPID');
const DTC = require('./models/dtc');
//=====================================================================================//

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); //this for loading static files which is exposed to public
//=================================== Session Configuration ===========================//
/*app.use(session({
    secret: 'keyboard',
    store: store,
    resave: false,
    proxy: true,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    Admin.findByPk(req.session.user.id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        });
});*/
//=====================================================================================//
//============================ Using Routes ===========================================//
app.use(authRoutes);
app.use(adminRoutes);
app.use(apiRoutes);
app.use(errorController.getError404);
//=====================================================================================//
//========================= Relations and assoications setup ==========================//
Device.belongsTo(Admin);
Admin.hasMany(Device);
Car.belongsTo(User);
User.hasMany(Car);
User.hasMany(EmgContacts);
EmgContacts.belongsTo(User);
Car.belongsToMany(Device, { through: CarDevice });
Device.belongsToMany(Car, { through: CarDevice });
//========================== Access Control Allow Origin ==============================//
app.use((req, res, next) => {
  // we set header for each respone leave the server to fix CORS errors "Share resources across
  //  different domains and servers"
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow any client or we can change it by set specific URL instead of *
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  ); // determine which HTTP method is allowed
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With, Accept, Origin'
  ); // determine which header can be allowed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  next();
});
app.options('*', cors());
app.use(cors());
//=====================================================================================//
//store.sync();
sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
