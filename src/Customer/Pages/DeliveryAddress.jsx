import React, { useState, useRef, useEffect } from "react";
import "../Styles/DeliveryAddress.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSpinner,
    faTimesCircle,
    faSignInAlt,
    faMapMarkerAlt,
    faShoppingBag,
    faCreditCard,
    faEnvelope,
    faPhone,
    faHome,
    faCity,
    faMapMarkedAlt,
    faHashtag,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const DeliveryAddress = () => {

    const navigate = useNavigate(); // initialize navigate



    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: "", type: "" });
    const [showModal, setShowModal] = useState(false);
    const [savedAt, setSavedAt] = useState(null);
    const [savedAddress, setSavedAddress] = useState(null);
    const [useSaved, setUseSaved] = useState(false);
    const firstErrorRef = useRef(null);

    // Load saved address from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("deliveryAddress");
        if (saved) {
            setSavedAddress(JSON.parse(saved));
        }
    }, []);

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
    };

    const formatPhone = (value) => {
        let digits = value.replace(/\D/g, "");
        if (digits.length > 10) digits = digits.slice(0, 10);
        return digits.replace(/(\d{3})(\d{3})(\d{0,4})/, (_, a, b, c) =>
            c ? `(${a}) ${b}-${c}` : `(${a}) ${b}`
        );
    };

    const formatZip = (value) => value.replace(/\D/g, "").slice(0, 6);

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "name":
                if (!value.trim()) error = "Name is required";
                break;
            case "email":
                if (!value.trim()) error = "Email is required";
                else if (!/^\S+@\S+\.\S+$/.test(value)) error = "Invalid email";
                break;
            case "phone":
                if (!value.trim()) error = "Phone is required";
                else if (!/^\(\d{3}\)\s\d{3}-\d{4}$/.test(value))
                    error = "Invalid phone";
                break;
            case "address":
                if (!value.trim()) error = "Address is required";
                break;
            case "city":
                if (!value.trim()) error = "City is required";
                break;
            case "state":
                if (!value.trim()) error = "State is required";
                break;
            case "zip":
                if (!value.trim()) error = "Zip code is required";
                else if (!/^\d{5,6}$/.test(value)) error = "Invalid zip code";
                break;
            default:
                break;
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
        return error === "";
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === "phone") value = formatPhone(value);
        if (name === "zip") value = formatZip(value);

        setForm({ ...form, [name]: value });
        validateField(name, value);
        setUseSaved(false); // Editing disables "use saved"
    };

    const validate = () => {
        let valid = true;
        Object.entries(form).forEach(([key, val]) => {
            if (!validateField(key, val)) valid = false;
        });

        if (!valid && firstErrorRef.current) {
            firstErrorRef.current.scrollIntoView({ behavior: "smooth" });
            firstErrorRef.current.focus();
        }
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) {
            showToast("❌ Please fix the errors", "error");
            return;
        }
        setShowModal(true);
    };

    const confirmSave = () => {
        setShowModal(false);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            localStorage.setItem("deliveryAddress", JSON.stringify(form));
            const now = new Date();
            setSavedAt(now.toLocaleString());
            showToast("✅ Address saved successfully!", "success");

            // Navigate to Order Summary page
            navigate("/order-summary");
        }, 1500);
    };

    const useSavedAddress = () => {
        if (savedAddress) {
            setForm({ ...savedAddress });
            setUseSaved(true);
            showToast("✅ Loaded saved address", "success");
        }
    };

    const fields = [
        { label: "Full Name", name: "name", type: "text", icon: faSignInAlt },
        { label: "Email", name: "email", type: "email", icon: faEnvelope },
        { label: "Phone Number", name: "phone", type: "text", icon: faPhone },
        { label: "Address", name: "address", type: "text", icon: faHome },
        { label: "City", name: "city", type: "text", icon: faCity },
        { label: "State", name: "state", type: "text", icon: faMapMarkedAlt },
        { label: "Zip Code", name: "zip", type: "text", icon: faHashtag },
    ];

    const completedFields = Object.values(form).filter((v) => v.trim() !== "").length;
    const progressPercent = Math.round((completedFields / 7) * 100);

    return (
        <div className={`checkout-container ${loading ? "loading" : ""}`}>
            {/* Stepper */}
            <div className="checkout-stepper">
                <div
                    className={`step ${completedFields >= 1 ? "completed" : ""} ${completedFields === 0 ? "active" : ""
                        }`}
                    title={savedAt ? `Saved at ${savedAt}` : ""}
                >
                    <span>
                        <FontAwesomeIcon
                            icon={completedFields >= 1 ? faCheckCircle : faSignInAlt}
                        />{" "}
                        Login
                    </span>
                </div>
                <div
                    className={`step ${completedFields >= 7 ? "completed" : ""} ${completedFields > 0 && completedFields < 7 ? "active" : ""
                        }`}
                >
                    <span>
                        <FontAwesomeIcon
                            icon={completedFields === 7 ? faCheckCircle : faMapMarkerAlt}
                        />{" "}
                        Delivery Address
                    </span>
                </div>
                <div className="step">
                    <span>
                        <FontAwesomeIcon icon={faShoppingBag} /> Order Summary
                    </span>
                </div>
                <div className="step">
                    <span>
                        <FontAwesomeIcon icon={faCreditCard} /> Payment
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="step-progress">
                <div
                    className="step-progress-fill"
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>

            {/* Saved address button */}
            {savedAddress && !useSaved && (
                <div className="saved-address-btn">
                    <button onClick={useSavedAddress}>Use Saved Address</button>
                </div>
            )}

            {/* Form + Preview */}
            <div className="checkout-content">
                <div className="delivery-box card">
                    <h2 className="delivery-title">Delivery Address</h2>
                    <form className="delivery-form" onSubmit={handleSubmit}>
                        {fields.map((field, idx) => (
                            <div className="form-group" key={field.name}>
                                <label htmlFor={field.name}>{field.label}</label>
                                <div className="input-wrapper">
                                    <FontAwesomeIcon icon={field.icon} className="input-icon" />
                                    <input
                                        type={field.type}
                                        id={field.name}
                                        name={field.name}
                                        placeholder={`Enter ${field.label.toLowerCase()}`}
                                        value={form[field.name]}
                                        onChange={handleChange}
                                        aria-invalid={errors[field.name] ? "true" : "false"}
                                        ref={
                                            errors[field.name] && !firstErrorRef.current
                                                ? firstErrorRef
                                                : null
                                        }
                                    />
                                </div>
                                {errors[field.name] && (
                                    <span className="error-msg">
                                        <FontAwesomeIcon icon={faTimesCircle} /> {errors[field.name]}
                                    </span>
                                )}
                            </div>
                        ))}
                        <button type="submit" className="delivery-btn" disabled={loading}>
                            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Continue"}
                        </button>
                    </form>
                </div>

                {/* Delivery Preview */}
                <div
                    className={`summary-box card ${Object.values(form).some((val) => val) ? "expanded" : ""
                        }`}
                >
                    <h3>Delivery Preview</h3>
                    {Object.values(form).some((val) => val) ? (
                        <>
                            <p><strong>Name:</strong> {form.name}</p>
                            <p><strong>Email:</strong> {form.email}</p>
                            <p><strong>Phone:</strong> {form.phone}</p>
                            <p><strong>Address:</strong> {form.address}</p>
                            <p><strong>City:</strong> {form.city}</p>
                            <p><strong>State:</strong> {form.state}</p>
                            <p><strong>Zip:</strong> {form.zip}</p>
                        </>
                    ) : (
                        <p className="empty-preview">Your address preview will appear here.</p>
                    )}
                </div>
            </div>

            {/* Toast */}
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

            {/* Confirmation Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirm Address</h3>
                        <p>Your address is saved. Continue to payment?</p>
                        <div className="modal-buttons">
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                            <button onClick={confirmSave} className="confirm-btn">
                                Yes, Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliveryAddress;
