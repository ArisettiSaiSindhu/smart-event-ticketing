import { useEffect, useState } from "react";
import API from "../services/api";

function MyTickets({ user }) {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    const fetchBookings = async () => {
        try {
            const response = await API.get(
                `/bookings/user/${user.id}`
            );

            setBookings(response.data.bookings || []);

        } catch (error) {
            console.error("Error fetching tickets:", error);
            setError("Unable to load your tickets.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Loading your tickets...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div>
            <h1>🎟️ My Tickets</h1>

            {bookings.length === 0 ? (
                <p>You haven't booked any tickets yet.</p>
            ) : (
                bookings.map((booking) => (
                    <div key={booking.id}>

                        <h2>
                            {booking.Event?.title}
                        </h2>

                        <p>
                            📅 {booking.Event?.date}
                        </p>

                        <p>
                            ⏰ {booking.Event?.time}
                        </p>

                        <p>
                            📍 {booking.Event?.venue}
                        </p>

                        <p>
                            🎟️ Ticket ID:{" "}
                            <strong>
                                {booking.ticketId}
                            </strong>
                        </p>

                        <p>
                            💰 Amount: ₹{booking.amount}
                        </p>

                        <p>
                            Status:{" "}
                            <strong>
                                {booking.status}
                            </strong>
                        </p>

                        <h3>Scan this QR at the entrance</h3>

                        <img
                            src={booking.qrCode}
                            alt="Ticket QR Code"
                            width="220"
                        />

                        <hr />

                    </div>
                ))
            )}
        </div>
    );
}

export default MyTickets;