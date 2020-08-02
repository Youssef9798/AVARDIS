const Sequelize = require('sequelize');
const sequelize = new Sequelize('avardisDB', 'root', 'Database_Admin97', {
    dialect: 'mysql',
    host: '127.0.0.1'
});
module.exports = sequelize;