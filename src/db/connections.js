require('dotenv').config();
const {Sequelize} = require('sequelize');

exports.openSequelizeConnection = new Sequelize(process.env.MYSQL_ADDON_URI);