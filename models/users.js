const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('users', {
    SSN: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    FirstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    LastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phoneNo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    bloodType: {
        type: Sequelize.STRING,
        allowNull: false
    }/* ,
    deviceID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'devices',
            key: 'id'
        }
    } */
});

module.exports = User;