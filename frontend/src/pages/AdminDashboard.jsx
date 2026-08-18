import { useState } from "react";
import API from "../services/api";

function AdminDashboard() {

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        price: "",
        totalSeats: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const createEvent = async (e) => {
        e.preventDefault();

        try {
            await API.post("/events", {
                ...form,
                price: Number(form.price),
                totalSeats: Number(form.totalSeats)
            });

            setMessage("Event created successfully!");

            setForm({
                title: "",
                description: "",
                date: "",
                time: "",
                venue: "",
                price: "",
                totalSeats: ""
            });

        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to create event"
            );
        }
    };

    return (
        <div>

            <h1>Admin Dashboard</h1>

            <h2>Create Event</h2>

            <form onSubmit={createEvent}>

                <input
                    name="title"
                    placeholder="Event title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    name="venue"
                    placeholder="Venue"
                    value={form.venue}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="totalSeats"
                    placeholder="Total seats"
                    value={form.totalSeats}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <button type="submit">
                    Create Event
                </button>

            </form>

            {message && <p>{message}</p>}

        </div>
    );
}

export default AdminDashboard;