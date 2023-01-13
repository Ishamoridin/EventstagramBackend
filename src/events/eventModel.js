const {DataTypes} = require('sequelize');
const {openSequelizeConnection} = require('../db/connection');

const Event = openSequelizeConnection.define("Events", {
    eventName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: "Indescribable"
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        defaultValue: 5
    },
    eventOwner: {
        type: DataTypes.INTEGER,
        references: 'SiteUsers',
        referencesKey: 'username'
    }
})
Event.sync()
module.exports = Event