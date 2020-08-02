const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const EmgContacts = sequelize.define('emg_contacts', {
    phoneNo: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
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
module.exports = EmgContacts;