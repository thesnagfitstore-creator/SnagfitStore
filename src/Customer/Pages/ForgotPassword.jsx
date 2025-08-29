import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/ForgotPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faSpinner,
    faCheckCircle,
    faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });

    const [toast, setToast] = useState({ message: "", type: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successAnimation, setSuccessAnimation] = useState(false);
    const [countdown, setCountdown] = useState(0); // redirect countdown

    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        number: false,
        uppercase: false,
        symbol: false,
    });

    const [strength, setStrength] = useState({ score: 0, label: "Weak" });

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
    };

    const calculateStrength = (password) => {
        const validations = {
            length: password.length >= 6,
            number: /\d/.test(password),
            uppercase: /[A-Z]/.test(password),
            symbol: /[^A-Za-z0-9]/.test(password),
        };
        setPasswordValidations(validations);

        let score = Object.values(validations).filter(Boolean).length;

        let label = "Weak";
        if (score >= 3) label = "Medium";
        if (score === 4) label = "Strong";

        setStrength({ score, label });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === "password") calculateStrength(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.password || !form.confirmPassword) {
            showToast("⚠️ Both fields are required", "error");
            return;
        }

        if (form.password !== form.confirmPassword) {
            showToast("❌ Passwords do not match", "error");
            return;
        }

        if (
            !passwordValidations.length ||
            !passwordValidations.number ||
            !passwordValidations.uppercase ||
            !passwordValidations.symbol
        ) {
            showToast("❌ Password does not meet requirements", "error");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccessAnimation(true);
            showToast("✅ Password reset successful!", "success");

            setCountdown(2); // start redirect countdown

            const interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        navigate("/login");
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }, 1500);
    };

    return (
        <div className="forgot-container">
            <div className={`forgot-box ${successAnimation ? "fade-out" : ""}`}>
                <h2 className="forgot-title">Reset Password</h2>
                <form className="forgot-form" onSubmit={handleSubmit}>
                    <div className="form-group password-group">
                        <label htmlFor="password">New Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter new password"
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

                        {/* Password Strength Meter */}
                        {form.password && (
                            <div className="password-strength">
                                <div
                                    className={`strength-bar strength-${strength.label.toLowerCase()}`}
                                    style={{ width: `${(strength.score / 4) * 100}%` }}
                                ></div>
                                <span className="strength-label">{strength.label}</span>
                            </div>
                        )}

                        {/* Validation Hints */}
                        {form.password && (
                            <div className="password-hints">
                                <p className={passwordValidations.length ? "valid" : "invalid"}>
                                    <FontAwesomeIcon
                                        icon={
                                            passwordValidations.length
                                                ? faCheckCircle
                                                : faTimesCircle
                                        }
                                    />{" "}
                                    At least 6 characters
                                </p>
                                <p className={passwordValidations.number ? "valid" : "invalid"}>
                                    <FontAwesomeIcon
                                        icon={
                                            passwordValidations.number
                                                ? faCheckCircle
                                                : faTimesCircle
                                        }
                                    />{" "}
                                    At least 1 number
                                </p>
                                <p className={passwordValidations.uppercase ? "valid" : "invalid"}>
                                    <FontAwesomeIcon
                                        icon={
                                            passwordValidations.uppercase
                                                ? faCheckCircle
                                                : faTimesCircle
                                        }
                                    />{" "}
                                    At least 1 uppercase letter
                                </p>
                                <p className={passwordValidations.symbol ? "valid" : "invalid"}>
                                    <FontAwesomeIcon
                                        icon={
                                            passwordValidations.symbol
                                                ? faCheckCircle
                                                : faTimesCircle
                                        }
                                    />{" "}
                                    At least 1 special symbol
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="form-group password-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                onPaste={(e) => e.preventDefault()} // prevent paste
                            />
                            <span
                                className="toggle-password"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                <FontAwesomeIcon
                                    icon={showConfirmPassword ? faEyeSlash : faEye}
                                />
                            </span>
                        </div>
                    </div>

                    <button type="submit" className="forgot-btn" disabled={loading}>
                        {loading ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                            "Reset Password"
                        )}
                    </button>
                </form>

                <div className="forgot-footer">
                    <Link to="/login">Back to Login</Link>
                </div>

                {countdown > 0 && (
                    <p className="redirect-msg">
                        Redirecting to login in {countdown}s...
                    </p>
                )}
            </div>

            {toast.message && (
                <div className={`toast ${toast.type}`}>
                    <span>{toast.message}</span>
                    <button
                        className="toast-close"
                        onClick={() => setToast({ message: "", type: "" })}
                    >
                        ×
                    </button>
                </div>
            )}

        </div>
    );
};

export default ForgotPassword;
