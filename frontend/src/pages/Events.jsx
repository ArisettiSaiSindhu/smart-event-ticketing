import { useEffect, useState } from "react";
import API from "../services/api";

function Events({ user }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [booking, setBooking] = useState(false);
    const [ticket, setTicket] = useState(null);
    const [bookingError, setBookingError] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await API.get("/events");

            setEvents(response.data.events || []);

        } catch (error) {
            console.error("Error fetching events:", error);
            setError("Unable to load events.");
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async (eventId) => {
        if (!user) {
            setBookingError("Please login before booking a ticket.");
            return;
        }

        setBooking(true);
        setBookingError("");
        setTicket(null);

        try {
            const response = await API.post("/bookings", {
                userId: user.id,
                eventId: eventId
            });

            setTicket(response.data);

            fetchEvents();

        } catch (error) {
            console.error("Booking error:", error);

            setBookingError(
                error.response?.data?.message ||
                "Unable to book ticket."
            );

        } finally {
            setBooking(false);
        }
    };

    if (loading) {
        return <h2>Loading events...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div>
            <h1>Upcoming Events 🎫</h1>

            {events.length === 0 ? (
                <p>No events available.</p>
            ) : (
                events.map((event) => (
                    <div key={event.id}>

                        <h2>{event.title}</h2>

                        <p>{event.description}</p>

                        <p>📅 {event.date}</p>

                        <p>⏰ {event.time}</p>

                        <p>📍 {event.venue}</p>

                        <p>💰 ₹{event.price}</p>

                        <p>
                            🎟️ Seats available:{" "}
                            {event.availableSeats}
                        </p>

                        {event.availableSeats > 0 ? (
                            <button
                                onClick={() =>
                                    handleBooking(event.id)
                                }
                                disabled={booking}
                            >
                                {booking
                                    ? "Booking..."
                                    : "Book Ticket"}
                            </button>
                        ) : (
                            <button disabled>
                                Sold Out
                            </button>
                        )}

                        <hr />
                    </div>
                ))
            )}

            {bookingError && (
                <div>
                    <h3>❌ Booking Failed</h3>
                    <p>{bookingError}</p>
                </div>
            )}

            {ticket && (
                <div>
                    <h2>🎉 Ticket Booked Successfully!</h2>

                    <p>
                        <strong>Ticket ID:</strong>{" "}
                        {ticket.booking.ticketId}
                    </p>

                    <p>
                        <strong>Amount:</strong>{" "}
                        ₹{ticket.booking.amount}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        {ticket.booking.status}
                    </p>

                    <h3>🎟️ Your QR Code</h3>

                    <img
                        src={ticket.qrCode}
                        alt="Ticket QR Code"
                        width="250"
                    />

                    <p>
                        Your ticket is also available in My Tickets.
                    </p>
                </div>
            )}
        </div>
    );
}

export default Events;