const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Car = sequelize.define('car', {
    plateNo: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    carModel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: true
    },
    userSSN: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        references: {
            model: 'users',
            key: 'SSN'
        }
    }
});
module.exports = Car;