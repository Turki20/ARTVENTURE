import React, { useState } from "react";
import { auth } from "./firebase";
import { useNavigate, Link } from 'react-router';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
export default function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        try {
            if (isLogin) {
                const res = await signInWithEmailAndPassword(auth, email, password);
                setUser(res.user);
                setMessage("Logged in successfully ");
                navigate("/home");
            } else {
                const res = await createUserWithEmailAndPassword(auth, email, password);
                setUser(res.user);
                setMessage("Account created successfully ");
                navigate("/home");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f5f5f5"
        }}>
            <div style={{
                maxWidth: "400px",
                width: "100%",
                padding: "2rem",
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textAlign: "center"
            }}>
                {!user ? (
                    <>
                        <h2 style={{ marginBottom: "1rem" }}>{isLogin ? "Login" : "Register"}</h2>
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    padding: "0.75rem",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc"
                                }}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    padding: "0.75rem",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc"
                                }}
                            />
                            <button type="submit" style={{
                                padding: "0.75rem",
                                backgroundColor: "#bae8e8",
                                color: "#272343",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}>
                                {isLogin ? "Login" : "Register"}
                            </button>
                        </form>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            style={{
                                marginTop: "1rem",
                                background: "none",
                                border: "none",
                                color: "#007bff",
                                cursor: "pointer"
                            }}
                        >
                            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                        </button>

                        {/* Success message */}
                        {message && (
                            <p style={{ color: "green", marginTop: "1rem", fontSize: "0.9rem" }}>
                                 {message}
                            </p>
                        )}

                        {/* Error message */}
                        {error && (
                            <p style={{ color: "red", marginTop: "0.5rem", fontSize: "0.9rem" }}>
                                 {error}
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <h2>Welcome, {user.email}</h2>
                        <button
                            onClick={handleLogout}
                            style={{
                                marginTop: "1rem",
                                padding: "0.75rem 1.5rem",
                                backgroundColor: "#dc3545",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
            
        </div>
    );
}
