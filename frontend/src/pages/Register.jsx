import { useState } from "react";
import API from "../services/api";

function Register({ onRegister }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        try {
            const response = await API.post("/auth/register", {
                name,
                email,
                password
            });

            setMessage(response.data.message);

            setTimeout(() => {
                if (onRegister) {
                    onRegister();
                }
            }, 1000);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div>
            <h1>Create Account</h1>

            <form onSubmit={handleRegister}>

                <div>
                    <label>Name</label>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <br />

                <button type="submit">
                    Register
                </button>

            </form>

            {message && (
                <p>✅ {message} Redirecting to login...</p>
            )}

            {error && (
                <p>❌ {error}</p>
            )}
        </div>
    );
}

export default Register;