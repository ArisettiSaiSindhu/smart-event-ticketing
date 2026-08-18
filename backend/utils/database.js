const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./smart_event_ticketing.sqlite",
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("SQLite connected successfully");
    } catch (error) {
        console.error("SQLite connection failed:", error.message);
    }
};

module.exports = { sequelize, connectDB };