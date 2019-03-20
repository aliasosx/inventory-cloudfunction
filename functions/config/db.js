const Sequelize = require('sequelize');
const config = require('./config');

module.exports = sequelize = new Sequelize(config.MYSQL_DB, config.MYSQL_USER, config.MYSQL_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    database: config.MYSQL_DB,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+07:00',
});