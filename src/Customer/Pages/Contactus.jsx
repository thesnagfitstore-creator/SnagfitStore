import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import emailjs from "emailjs-com";
import "../Styles/Conatctus.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [popup, setPopup] = useState({ show: false, message: "", type: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs
            .send(
                "service_dtp7p47",
                "template_gta7h8l",
                {
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    time: new Date().toLocaleString(),
                },
                "IMC_8UZ_qQSXV6TBh"
            )
            .then(
                () => {
                    setPopup({
                        show: true,
                        message: "Message sent successfully!",
                        type: "success",
                    });
                    setLoading(false);
                },
                () => {
                    setPopup({
                        show: true,
                        message: "Failed to send message. Try again later.",
                        type: "error",
                    });
                    setLoading(false);
                }
            );
    };

    const closePopup = () => {
        setPopup({ show: false, message: "", type: "" });
        window.location.reload(); // 🔄 reloads contact page
    };

    return (
        <section className="contact-section">
            <div className="container">
                {/* Heading */}
                <h2 className="section-title">Contact Us</h2>
                <p className="section-subtitle">
                    Have questions? Send us a message and we’ll respond as soon as possible.
                </p>

                <div className="contact-grid">
                    {/* Form */}
                    <div className="contact-card">
                        <h5 className="card-title">Send us a message</h5>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="contact-input"
                                    placeholder="Enter Your Name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="contact-input"
                                    placeholder="Enter your Email"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="contact-input"
                                    placeholder="Enter your Subject"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="contact-textarea"
                                    placeholder="Enter your Message..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="contact-submit"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>

                    {/* Info */}
                    <div className="contact-info">
                        <h5 className="card-title">Get in touch</h5>

                        <div className="info-item">
                            <FaEnvelope />
                            <div>
                                <h6>Email</h6>
                                <a href="mailto:support@snagfitstore.com">
                                    support@snagfitstore.com
                                </a>
                                <p>We’ll respond within 24 hours</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <FaPhoneAlt />
                            <div>
                                <h6>Phone</h6>
                                <a href="tel:+916398947324">+91 6398947324</a>
                                <p>24/7 Support</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <FaMapMarkerAlt />
                            <div>
                                <h6>Address</h6>
                                <p>Pilkhuwa, Hapur</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ✅ Popup Modal */}
            {popup.show && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        {popup.type === "success" ? (
                            <FaCheckCircle className="popup-icon success" />
                        ) : (
                            <FaTimesCircle className="popup-icon error" />
                        )}
                        <p className="popup-message">{popup.message}</p>
                        <button onClick={closePopup} className="popup-btn">OK</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Contact;
