const express = require("express");
const cors = require("cors");

require("dotenv").config({
    path: ".env"
});

const { sequelize, connectDB } = require("./utils/database");
const User = require("./models/User");
const Event = require("./models/Event");
const Booking = require("./models/Booking");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Smart Event Ticketing API is running!"
    });
});
User.hasMany(Booking, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

Booking.belongsTo(User, {
    foreignKey: "userId"
});

Event.hasMany(Booking, {
    foreignKey: "eventId",
    onDelete: "CASCADE"
});

Booking.belongsTo(Event, {
    foreignKey: "eventId"
});
// Start database
const startServer = async () => {
    try {
        await connectDB();

        // Creates/synchronizes database tables
        await sequelize.sync();

        console.log("Database tables synchronized");
    } catch (error) {
        console.error("Database startup error:", error.message);
    }
};

startServer();

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});