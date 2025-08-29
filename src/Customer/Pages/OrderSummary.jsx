// src/Customer/Pages/OrderSummary.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/OrderSummary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingBag,
    faCheckCircle,
    faCreditCard,
    faMapMarkerAlt,
    faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

import Navbar from "../Components/Navigation/Navbar";
import { useCart } from "../Context/CartContext";
import Toast from "../Components/Toaster/Toast";

const OrderSummary = () => {
    const { cart, removeFromCart, updateQty } = useCart();
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    // Load delivery address
    const [deliveryAddress, setDeliveryAddress] = useState(null);
    useEffect(() => {
        const savedAddress = localStorage.getItem("deliveryAddress");
        if (savedAddress) setDeliveryAddress(JSON.parse(savedAddress));
    }, []);

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [message, setMessage] = useState("");

    // Coupon logic
    const applyCoupon = () => {
        let discountValue = 0;
        if (coupon === "SAVE10") discountValue = subtotal * 0.1;
        else if (coupon === "WELCOME20") discountValue = subtotal * 0.2;
        else {
            setMessage("❌ Invalid Coupon Code");
            setDiscount(0);
            return;
        }
        setDiscount(discountValue);
        setMessage(`✅ ${coupon} applied (-$${discountValue.toFixed(2)})`);
    };

    // Shipping & Tax
    const shipping = subtotal >= 500 ? 0 : subtotal > 0 ? 50 : 0;
    const tax = subtotal * 0.1;
    const grandTotal = subtotal + shipping + tax - discount;

    // Delivery Date
    const today = new Date();
    const minDelivery = new Date(today);
    minDelivery.setDate(today.getDate() + 3);
    const maxDelivery = new Date(today);
    maxDelivery.setDate(today.getDate() + 5);

    const formatDate = (date) =>
        date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    const showToast = (type, message) => setToast({ type, message });

    const moveToWishlist = (item) => {
        try {
            const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            const exists = storedWishlist.find((w) => w.id === item.id);
            if (!exists) localStorage.setItem("wishlist", JSON.stringify([...storedWishlist, item]));
            showToast("success", exists ? "⚠️ Already in Wishlist" : `💖 ${item.name} moved to Wishlist`);
            removeFromCart(item.id);
        } catch {
            showToast("error", "❌ Something went wrong");
        }
    };


    // Steps
    const steps = [
        { name: "Login", route: "/", icon: faSignInAlt },
        { name: "Delivery Address", route: "/checkout/delivery", icon: faMapMarkerAlt },
        { name: "Order Summary", route: "/order-summary", icon: faShoppingBag },
        { name: "Payment", route: "/checkout/payment", icon: faCreditCard },
    ];

    // Track completed step dynamically
    const completedStep = deliveryAddress ? 2 : 1; // Login always done

    return (
        <>
            <Navbar />

            <section id="order-summary-page">
                <h2>Order Summary</h2>

                {/* Clickable Stepper */}
                <div className="checkout-stepper">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`step ${index < completedStep ? "completed" : ""} ${index === completedStep ? "active" : ""}`}
                            onClick={() => {
                                if (index <= completedStep) navigate(step.route);
                            }}
                            style={{ cursor: index <= completedStep ? "pointer" : "default" }}
                            title={index <= completedStep ? "Click to go to this step" : ""}
                        >
                            <FontAwesomeIcon
                                icon={index < completedStep ? faCheckCircle : step.icon}
                            /> {step.name}
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

                {cart.length === 0 ? (
                    <p className="empty-cart">Your cart is empty 🛒</p>
                ) : (
                    <div className="order-summary-container">
                        {/* Product Details */}
                        <div className="order-products">
                            {cart.map((item) => (
                                <div className="order-card" key={item.id}>
                                    <img src={item.images[0]} alt={item.name} />
                                    <div className="order-info">
                                        <h4>{item.name}</h4>
                                        <p>Unit Price: ${item.price.toFixed(2)}</p>
                                        <div className="qty-control">
                                            <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                                            <span>{item.qty}</span>
                                            <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                                        </div>
                                        <p>Line Total: <strong>${(item.price * item.qty).toFixed(2)}</strong></p>
                                        <div className="order-buttons">
                                            <button
                                                className="remove-btn"
                                                onClick={() => {
                                                    removeFromCart(item.id);
                                                    showToast("info", `❌ ${item.name} removed`);
                                                }}
                                            >
                                                ❌ Remove
                                            </button>
                                            <button className="wishlist-btn" onClick={() => moveToWishlist(item)}>
                                                💖 Wishlist
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                        {/* Order Summary + Delivery */}
                        <div className="order-summary">
                            <h3>Order Summary</h3>
                            <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
                            <p>Shipping: <strong>{shipping === 0 ? "FREE 🚚" : `$${shipping.toFixed(2)}`}</strong></p>
                            <p>Tax (10%): <strong>${tax.toFixed(2)}</strong></p>
                            {discount > 0 && <p className="discount-text">Discount: -${discount.toFixed(2)}</p>}
                            <hr />
                            <p className="grand-total">Grand Total: <strong>${grandTotal.toFixed(2)}</strong></p>
                            <p className="delivery-date">
                                Estimated Delivery: <strong>{formatDate(minDelivery)} - {formatDate(maxDelivery)}</strong>
                            </p>

                            {/* Delivery Address Preview */}
                            {deliveryAddress && (
                                <div className="delivery-preview">
                                    <h3>Delivery Address</h3>
                                    <p><strong>Name:</strong> {deliveryAddress.name}</p>
                                    <p><strong>Email:</strong> {deliveryAddress.email}</p>
                                    <p><strong>Phone:</strong> {deliveryAddress.phone}</p>
                                    <p><strong>Address:</strong> {deliveryAddress.address}</p>
                                    <p><strong>City:</strong> {deliveryAddress.city}</p>
                                    <p><strong>State:</strong> {deliveryAddress.state}</p>
                                    <p><strong>Zip:</strong> {deliveryAddress.zip}</p>
                                    <button
                                        className="continue-btn"
                                        style={{ marginTop: "1rem" }}
                                        onClick={() => navigate("/checkout/delivery")}
                                    >
                                        ✏️ Change Address
                                    </button>
                                </div>
                            )}

                            {/* Coupon Box */}
                            <div className="coupon-box">
                                <input
                                    type="text"
                                    placeholder="Enter coupon code"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                />
                                <button onClick={applyCoupon}>Apply</button>
                            </div>
                            {message && <p className="coupon-msg">{message}</p>}

                            {/* Buttons */}

                            <button className="checkout-btn" onClick={() => navigate("/checkout/payment")}>
                                Proceed to Payment
                            </button>
                            <button className="continue-btn" onClick={() => navigate("/mens")}>
                                ⬅️ Continue Shopping
                            </button>
                        </div>
                    </div>
                )}

                {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
            </section>
        </>
    );
};

export default OrderSummary;
