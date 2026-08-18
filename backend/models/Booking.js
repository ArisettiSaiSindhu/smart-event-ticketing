const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const Booking = sequelize.define("Booking", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    ticketId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    bookingDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },

    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM("ACTIVE", "USED", "CANCELLED"),
        defaultValue: "ACTIVE",
    },
});

module.exports = Booking;