const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const carDevice = sequelize.define('car-device', {
    /* carID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'cars',
            key: 'plateNo'
        }
    },
    deviceID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'devices',
            key: 'id'
        }
    }, */
    date: {
        type: Sequelize.DATE
    },
    lastLocation: {
        type: Sequelize.STRING,
        allowNull: true
    }
});
module.exports = carDevice;