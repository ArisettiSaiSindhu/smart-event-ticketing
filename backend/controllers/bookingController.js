const Booking = require("../models/Booking");
const Event = require("../models/Event");
const User = require("../models/User");
const crypto = require("crypto");
const generateQRCode = require("../utils/qrGenerator");


// Create booking
const createBooking = async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        if (!userId || !eventId) {
            return res.status(400).json({
                success: false,
                message: "userId and eventId are required"
            });
        }

        // Find event
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        // Check seats
        if (event.availableSeats <= 0) {
            return res.status(400).json({
                success: false,
                message: "Event is sold out"
            });
        }

        // Check user
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Generate unique ticket ID
        const ticketId =
            "TKT-" + crypto.randomBytes(5).toString("hex").toUpperCase();

        // Create booking
        const booking = await Booking.create({
            userId,
            eventId,
            ticketId,
            amount: event.price,
            status: "ACTIVE"
        });
        const qrCode = await generateQRCode(ticketId);

        // Decrease available seats
        event.availableSeats -= 1;
        await event.save();

        res.status(201).json({
            success: true,
            message: "Ticket booked successfully",
            booking,
            qrCode
        });

    } catch (error) {
        console.error("Booking error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while creating booking"
        });
    }
};


const getUserBookings = async (req, res) => {
    try {
        const { userId } = req.params;

        const bookings = await Booking.findAll({
            where: { userId },
            include: [
                {
                    model: Event,
                    attributes: [
                        "id",
                        "title",
                        "description",
                        "date",
                        "time",
                        "venue",
                        "price"
                    ]
                }
            ],
            order: [["bookingDate", "DESC"]]
        });

        // Generate QR code for every ticket
        const bookingsWithQR = await Promise.all(
            bookings.map(async (booking) => {
                const qrCode = await generateQRCode(
                    booking.ticketId
                );

                return {
                    ...booking.toJSON(),
                    qrCode
                };
            })
        );

        res.json({
            success: true,
            count: bookingsWithQR.length,
            bookings: bookingsWithQR
        });

    } catch (error) {
        console.error("Get bookings error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching bookings"
        });
    }
};

// Get single booking
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id, {
            include: [
                {
                    model: Event
                },
                {
                    model: User,
                    attributes: ["id", "name", "email"]
                }
            ]
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.json({
            success: true,
            booking
        });

    } catch (error) {
        console.error("Get booking error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching booking"
        });
    }
};

const verifyTicket = async (req, res) => {
    try {
        const { ticketId } = req.body;

        if (!ticketId) {
            return res.status(400).json({
                success: false,
                message: "Ticket ID is required"
            });
        }

        const booking = await Booking.findOne({
            where: { ticketId },
            include: [
                {
                    model: Event
                },
                {
                    model: User,
                    attributes: ["id", "name", "email"]
                }
            ]
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                valid: false,
                message: "Invalid ticket"
            });
        }

        if (booking.status === "USED") {
            return res.status(400).json({
                success: false,
                valid: false,
                message: "Ticket has already been used"
            });
        }

        if (booking.status === "CANCELLED") {
            return res.status(400).json({
                success: false,
                valid: false,
                message: "Ticket has been cancelled"
            });
        }

        // Mark ticket as used
        booking.status = "USED";
        await booking.save();

        res.json({
            success: true,
            valid: true,
            message: "Ticket verified successfully",
            ticket: {
                ticketId: booking.ticketId,
                status: booking.status,
                user: booking.User,
                event: booking.Event
            }
        });

    } catch (error) {
        console.error("Ticket verification error:", error);

        res.status(500).json({
            success: false,
            message: "Server error during ticket verification"
        });
    }
};
module.exports = {
    createBooking,
    getUserBookings,
    getBookingById,
    verifyTicket
};