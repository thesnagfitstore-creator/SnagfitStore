import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import Navbar from "../Components/Navigation/Navbar";
import { useCart } from "../Context/CartContext";
import Toast from "../Components/Toaster/Toast";
import "../Styles/Payment.css";

const Payment = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);

    // Load delivery address
    const [deliveryAddress, setDeliveryAddress] = useState(null);
    useEffect(() => {
        const savedAddress = localStorage.getItem("deliveryAddress");
        if (savedAddress) setDeliveryAddress(JSON.parse(savedAddress));
    }, []);

    // Stepper
    const completedStep = 3; // 0=Login, 1=Delivery, 2=OrderSummary, 3=Payment
    const steps = [
        { name: "Login", path: "/" },
        { name: "Delivery Address", path: "/checkout/delivery" },
        { name: "Order Summary", path: "/checkout/order-summary" },
        { name: "Payment", path: "/checkout/payment" },
    ];

    const handleStepClick = (index) => {
        if (index < completedStep) {
            navigate(steps[index].path);
        }
    };

    // Calculate totals
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = subtotal >= 500 ? 0 : subtotal > 0 ? 50 : 0;
    const tax = subtotal * 0.1;
    const grandTotal = subtotal + shipping + tax;

    const showToast = (type, message) => setToast({ type, message });

    // COD Payment
    const handleCOD = () => {
        clearCart();
        showToast("success", "✅ Order placed successfully with Cash on Delivery");
        navigate("/order-confirmation");
    };

    // Razorpay Payment placeholder
    const handleOnlinePayment = () => {
        alert("🔹 Razorpay integration will go here");
        // After success, clear cart & navigate to confirmation
    };

    return (
        <>
            <Navbar />

            <section id="payment-page">
                <h2>Payment</h2>

                {/* Stepper */}
                <div className="checkout-stepper">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`step ${completedStep > index ? "completed" : ""} ${completedStep === index ? "active" : ""}`}
                            onClick={() => handleStepClick(index)}
                            style={{ cursor: index < completedStep ? "pointer" : "default" }}
                        >
                            <span>
                                <FontAwesomeIcon icon={completedStep > index ? faCheckCircle : faMapMarkerAlt} /> {step.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Progress bar */}
                <div className="step-progress">
                    <div
                        className="step-progress-fill"
                        style={{ width: `${((completedStep + 1) / steps.length) * 100}%` }}
                    ></div>
                </div>

                <div className="payment-container">
                    {/* Payment Options */}
                    <div className="payment-options">
                        <h3>Select Payment Method</h3>
                        <button className="online-btn" onClick={handleOnlinePayment}>
                            💳 Pay Online
                        </button>
                        <button className="cod-btn" onClick={handleCOD}>
                            🛵 Cash on Delivery
                        </button>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        {cart.length === 0 ? (
                            <p className="empty-cart">Your cart is empty 🛒</p>
                        ) : (
                            <>
                                {cart.map((item) => (
                                    <div className="order-card" key={item.id}>
                                        <img src={item.images[0]} alt={item.name} />
                                        <div className="order-info">
                                            <h4>{item.name}</h4>
                                            <p>${item.price.toFixed(2)} x {item.qty}</p>
                                            <p><strong>Line Total: ${(item.price * item.qty).toFixed(2)}</strong></p>
                                        </div>
                                    </div>
                                ))}
                                <hr />
                                <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
                                <p>Shipping: <strong>{shipping === 0 ? "FREE 🚚" : `$${shipping.toFixed(2)}`}</strong></p>
                                <p>Tax (10%): <strong>${tax.toFixed(2)}</strong></p>
                                <p className="grand-total">Grand Total: <strong>${grandTotal.toFixed(2)}</strong></p>

                                {/* Delivery Address */}
                                {deliveryAddress && (
                                    <div className="delivery-preview">
                                        <h4>Delivery Address</h4>
                                        <p><strong>{deliveryAddress.name}</strong></p>
                                        <p>{deliveryAddress.address}, {deliveryAddress.city}</p>
                                        <p>{deliveryAddress.state} - {deliveryAddress.zip}</p>
                                        <p>{deliveryAddress.phone}</p>

                                        {/* Change Address button */}
                                        <button
                                            className="change-address-bttn"
                                            onClick={() => navigate("/checkout/delivery")}
                                        >
                                            ✏️ Change Address
                                        </button>
                                    </div>
                                )}

                            </>
                        )}
                    </div>
                </div>

                {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
            </section>
        </>
    );
};

export default Payment;
