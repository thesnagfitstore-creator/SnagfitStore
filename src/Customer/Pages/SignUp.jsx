import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/Signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faCheckCircle,
    faTimesCircle,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [toast, setToast] = useState({ message: "", type: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        number: false,
        uppercase: false,
        symbol: false,
    });

    const [loading, setLoading] = useState(false);          // spinner while submitting
    const [successAnimation, setSuccessAnimation] = useState(false); // fade-out card

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
    };

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validatePassword = (pass) => pass.length >= 6 && /\d/.test(pass);

    const calculateStrength = (password) => {
        let strength = 0;
        if (password.length >= 6) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/\d/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        setPasswordStrength(strength);

        // live rule flags
        setPasswordValidations({
            length: password.length >= 6,
            number: /\d/.test(password),
            uppercase: /[A-Z]/.test(password),
            symbol: /[^A-Za-z0-9]/.test(password),
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (name === "password") calculateStrength(value);
    };

    // ---- derived flags for disabling button (YOUR ORIGINAL INTENT) ----
    const allPasswordRulesValid =
        passwordValidations.length &&
        passwordValidations.number &&
        passwordValidations.uppercase &&
        passwordValidations.symbol;

    const passwordsMatch =
        form.password &&
        form.confirmPassword &&
        form.password === form.confirmPassword;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            showToast("⚠️ All fields are required", "error");
            return;
        }

        if (!validateEmail(form.email)) {
            showToast("❌ Invalid email format", "error");
            return;
        }

        // keep your existing simple check…
        if (!validatePassword(form.password)) {
            showToast("❌ Password must be 6+ chars & include a number", "error");
            return;
        }

        // …and also enforce the full rules + match (for consistency with disable state)
        if (!allPasswordRulesValid) {
            showToast("❌ Password does not meet all requirements", "error");
            return;
        }

        if (!passwordsMatch) {
            showToast("❌ Passwords do not match", "error");
            return;
        }

        // submit UX
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccessAnimation(true); // fade-out card

            showToast("✅ Account created successfully!", "success");
            localStorage.setItem("user", JSON.stringify(form));

            // navigate after fade-out
            setTimeout(() => navigate("/login"), 2000);
        }, 1500);
    };

    return (
        <div className="signup-container">
            <div className={`signup-box ${successAnimation ? "fade-out" : ""}`}>
                <h2 className="signup-title">Create Account</h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

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

                        {/* strength + rule hints */}
                        {form.password && (
                            <>
                                <div className="password-strength">
                                    <div className={`strength-bar strength-${passwordStrength}`} />
                                    <p className="strength-text">
                                        {passwordStrength <= 1
                                            ? "Weak"
                                            : passwordStrength === 2
                                                ? "Medium"
                                                : passwordStrength === 3
                                                    ? "Strong"
                                                    : "Very Strong"}
                                    </p>
                                </div>

                                <div className="password-hints">
                                    <p className={passwordValidations.length ? "valid" : "invalid"}>
                                        <FontAwesomeIcon
                                            icon={passwordValidations.length ? faCheckCircle : faTimesCircle}
                                        />{" "}
                                        At least 6 characters
                                    </p>
                                    <p className={passwordValidations.number ? "valid" : "invalid"}>
                                        <FontAwesomeIcon
                                            icon={passwordValidations.number ? faCheckCircle : faTimesCircle}
                                        />{" "}
                                        At least 1 number
                                    </p>
                                    <p className={passwordValidations.uppercase ? "valid" : "invalid"}>
                                        <FontAwesomeIcon
                                            icon={passwordValidations.uppercase ? faCheckCircle : faTimesCircle}
                                        />{" "}
                                        At least 1 uppercase letter
                                    </p>
                                    <p className={passwordValidations.symbol ? "valid" : "invalid"}>
                                        <FontAwesomeIcon
                                            icon={passwordValidations.symbol ? faCheckCircle : faTimesCircle}
                                        />{" "}
                                        At least 1 special symbol
                                    </p>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="form-group password-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />
                            <span
                                className="toggle-password"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>

                        {/* live match message (kept minimal, doesn’t remove anything) */}
                        {form.confirmPassword && (
                            <p className={`confirm-message ${passwordsMatch ? "valid" : "invalid"}`}>
                                {passwordsMatch ? "✅ Passwords match" : "❌ Passwords do not match"}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="signup-btn"
                        // ⬇️ disabled when loading OR rules not met OR not matching
                        disabled={loading || !allPasswordRulesValid || !passwordsMatch}
                    >
                        {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Create Account"}
                    </button>
                </form>

                <div className="signup-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>

            {toast.message && <div className={`toast ${toast.type}`}>{toast.message}</div>}
        </div>
    );
};

export default SignUp;
