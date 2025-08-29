import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [toast, setToast] = useState({ message: "", type: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
    };

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            showToast("⚠️ All fields are required", "error");
            return;
        }

        if (!validateEmail(form.email)) {
            showToast("❌ Invalid email format", "error");
            return;
        }

        if (form.password.length < 6) {
            showToast("❌ Password must be at least 6 characters", "error");
            return;
        }

        // Fake Login Flow
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            // Dummy user check (will replace with backend later)
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (
                storedUser &&
                storedUser.email === form.email &&
                storedUser.password === form.password
            ) {
                showToast("✅ Login successful!", "success");
                setTimeout(() => navigate("/"), 2000); // redirect home
            } else {
                showToast("❌ Invalid credentials", "error");
            }
        }, 1500);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Welcome Back</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password */}
                    <div className="form-group password-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                            />
                            <span
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="forgot-password">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>

                    {/* Button */}
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    Don’t have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>

            {/* Toast */}
            {toast.message && (
                <div className={`toast ${toast.type}`}>{toast.message}</div>
            )}
        </div>
    );
};

export default Login;
