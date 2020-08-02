const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const UserLogs = sequelize.define('userLogs', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING(800),
    allowNull: true,
    defaultValue: 'No location Found',
  },
});

module.exports = UserLogs;
