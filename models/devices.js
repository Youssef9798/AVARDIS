const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Device = sequelize.define('device', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    macAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    carPlate: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'cars',
            key: 'plateNo'
        }
    }
});
module.exports = Device;