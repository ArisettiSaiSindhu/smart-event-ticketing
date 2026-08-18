import { useState } from "react";

import Events from "./pages/Events";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyTickets from "./pages/MyTickets";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [page, setPage] = useState(
        user ? "events" : "register"
    );

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        setPage("events");
    };

    const handleRegister = () => {
        setPage("login");
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setPage("login");
    };

    return (
        <div>
            {/* Navigation */}
            <header>
                <h1>🎟️ SmartEvent</h1>

                {!user ? (
                    <>
                        <button onClick={() => setPage("register")}>
                            Register
                        </button>

                        <button onClick={() => setPage("login")}>
                            Login
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setPage("events")}>
                            Events
                        </button>

                        <button onClick={() => setPage("tickets")}>
                            My Tickets
                        </button>

                        {user.role === "admin" && (
                            <button onClick={() => setPage("admin")}>
                                Admin Dashboard
                            </button>
                        )}

                        <button onClick={logout}>
                            Logout
                        </button>
                    </>
                )}
            </header>

            <hr />

            {/* Pages */}
            <main>

                {!user && page === "register" && (
                    <Register onRegister={handleRegister} />
                )}

                {!user && page === "login" && (
                    <Login onLogin={handleLogin} />
                )}

                {user && page === "events" && (
                    <Events user={user} />
                )}

                {user && page === "tickets" && (
                    <MyTickets user={user} />
                )}

                {user && user.role === "admin" && page === "admin" && (
                    <AdminDashboard />
                )}

            </main>
        </div>
    );
}

export default App;