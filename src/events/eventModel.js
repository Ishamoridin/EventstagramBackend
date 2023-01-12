const {DataTypes} = require('sequelize');
const {openSequelizeConnection} = require('../db/connection');

const Event = openSequelizeConnection.define("Events", {
    eventName: {
        type: DataTypes.STRING,
        allowNull: false,
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
    instance: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false,
    }
})
Event.sync()
module.exports = Event