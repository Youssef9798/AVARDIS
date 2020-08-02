const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const DPID = sequelize.define('pid', {
    PID: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    mode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(2000),
        allowNull: true
    },
    min_value: {
        type: Sequelize.BIGINT(11),
        allowNull: true,
        defaultValue: null
    },
    max_value: {
        type: Sequelize.BIGINT(11),
        allowNull: true,
        defaultValue: null
    },
    unit: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = DPID;