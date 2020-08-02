const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const DTC = sequelize.define('dtc', {
    code: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING(2000),
        allowNull: true
    }
});

module.exports = DTC;

