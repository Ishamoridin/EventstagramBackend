const {DataTypes} = require('sequelize');
const {openSequelizeConnection} = require('../db/connection');

const User = openSequelizeConnection.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNUll: false
    }

})

module.exports = User