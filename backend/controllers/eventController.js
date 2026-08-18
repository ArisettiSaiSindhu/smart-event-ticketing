const Event = require("../models/Event");

// Create a new event
const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            date,
            time,
            venue,
            price,
            totalSeats,
            image
        } = req.body;

        // Validate required fields
        if (
            !title ||
            !description ||
            !date ||
            !time ||
            !venue ||
            price === undefined ||
            !totalSeats
        ) {
            return res.status(400).json({
                success: false,
                message: "All required event fields must be provided"
            });
        }

        // Create event
        const event = await Event.create({
            title,
            description,
            date,
            time,
            venue,
            price,
            totalSeats,
            availableSeats: totalSeats,
            image: image || null
        });

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event
        });

    } catch (error) {
        console.error("Create event error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while creating event"
        });
    }
};


// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            order: [["date", "ASC"]]
        });

        res.json({
            success: true,
            count: events.length,
            events
        });

    } catch (error) {
        console.error("Get events error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching events"
        });
    }
};


// Get single event
const getEventById = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        res.json({
            success: true,
            event
        });

    } catch (error) {
        console.error("Get event error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching event"
        });
    }
};


// Update event
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        await event.update(req.body);

        res.json({
            success: true,
            message: "Event updated successfully",
            event
        });

    } catch (error) {
        console.error("Update event error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while updating event"
        });
    }
};


// Delete event
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        await event.destroy();

        res.json({
            success: true,
            message: "Event deleted successfully"
        });

    } catch (error) {
        console.error("Delete event error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while deleting event"
        });
    }
};


module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
};