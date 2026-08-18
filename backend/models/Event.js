const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const Event = sequelize.define("Event", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },

    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },

    venue: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    availableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Event;