const {DataTypes} = require('sequelize');
const {openSequelizeConnection} = require('../db/connection');

const SiteUser = openSequelizeConnection.define("SiteUsers", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

},
{freezeTablenames: true})
SiteUser.sync()
module.exports = SiteUser