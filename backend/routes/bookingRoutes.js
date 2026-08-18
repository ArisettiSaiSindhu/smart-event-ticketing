const express = require("express");

const {
    createBooking,
    getUserBookings,
    getBookingById,
    verifyTicket
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);

router.get("/user/:userId", getUserBookings);

router.post("/verify", verifyTicket);

router.get("/:id", getBookingById);

module.exports = router;