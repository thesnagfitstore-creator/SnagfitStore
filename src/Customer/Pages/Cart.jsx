// src/Customer/Pages/Cart.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navigation/Navbar";
import { useCart } from "../Context/CartContext";
import Toast from "../Components/Toaster/Toast";
import "../Styles/Cart.css";

const Cart = () => {
    const { cart, removeFromCart, updateQty, clearCart } = useCart();
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [message, setMessage] = useState("");

    // ✅ Coupon logic
    const applyCoupon = () => {
        let discountValue = 0;
        if (coupon === "SAVE10") {
            discountValue = subtotal * 0.1; // 10% off
            setMessage("✅ SAVE10 applied (10% off)");
        } else if (coupon === "WELCOME20") {
            discountValue = subtotal * 0.2; // 20% off
            setMessage("✅ WELCOME20 applied (20% off)");
        } else {
            setMessage("❌ Invalid Coupon Code");
            setDiscount(0);
            return;
        }
        setDiscount(discountValue);
    };

    // ✅ Shipping & Tax logic
    const shipping = subtotal >= 500 ? 0 : (subtotal > 0 ? 50 : 0);
    const tax = subtotal * 0.1;
    const grandTotal = subtotal + shipping + tax - discount;

    // ✅ Delivery Date (3–5 days from today)
    const today = new Date();
    const minDelivery = new Date(today);
    minDelivery.setDate(today.getDate() + 3);
    const maxDelivery = new Date(today);
    maxDelivery.setDate(today.getDate() + 5);

    const formatDate = (date) =>
        date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    // ✅ Toast helper
    const showToast = (type, message) => {
        setToast({ type, message });
    };

    // ✅ Move to Wishlist
    const moveToWishlist = (item) => {
        try {
            const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            const exists = storedWishlist.find((w) => w.id === item.id);

            if (!exists) {
                localStorage.setItem("wishlist", JSON.stringify([...storedWishlist, item]));
                showToast("success", `💖 ${item.name} moved to Wishlist`);
            } else {
                showToast("warning", "⚠️ Already in Wishlist");
            }
            removeFromCart(item.id);
        } catch (error) {
            showToast("error", "❌ Something went wrong");
        }
    };

    // ✅ Clear Cart
    const handleClearCart = () => {
        clearCart();
        showToast("info", "🛒 Cart cleared successfully");
    };

    return (
        <>
            <Navbar />
            <section id="cart-page">
                <h2>Your Cart</h2>

                {cart.length === 0 ? (
                    <p className="empty-cart">Your cart is empty 🛒</p>
                ) : (
                    <div className="cart-container">
                        {/* ✅ Cart Items */}
                        <div className="cart-items">
                            {cart.map((item) => (
                                <div className="cart-card" key={item.id}>
                                    <img src={item.images[0]} alt={item.name} />
                                    <div className="cart-info">
                                        <h4>{item.name}</h4>
                                        <p>${item.price}</p>
                                        <div className="qty-control">
                                            <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                                            <span>{item.qty}</span>
                                            <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                                        </div>
                                        <div className="cart-buttons">
                                            <button
                                                className="remove-btn"
                                                onClick={() => {
                                                    removeFromCart(item.id);
                                                    showToast("info", `❌ ${item.name} removed from Cart`);
                                                }}
                                            >
                                                ❌ Remove
                                            </button>
                                            <button
                                                className="wishlist-btnn"
                                                onClick={() => moveToWishlist(item)}
                                            >
                                                💖 Move to Wishlist
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ✅ Order Summary */}
                        <div className="cart-summary">
                            <h3>Order Summary</h3>
                            <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
                            <p>Shipping: <strong>{shipping === 0 ? "FREE 🚚" : `$${shipping.toFixed(2)}`}</strong></p>
                            <p>Tax (10%): <strong>${tax.toFixed(2)}</strong></p>
                            {discount > 0 && <p className="discount-text">Discount: -${discount.toFixed(2)}</p>}
                            <hr />
                            <p className="grand-total">Grand Total: <strong>${grandTotal.toFixed(2)}</strong></p>
                            <p className="delivery-date">
                                Estimated Delivery:{" "}
                                <strong>{formatDate(minDelivery)} - {formatDate(maxDelivery)}</strong>
                            </p>

                            {/* ✅ Coupon Box */}
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

                            {/* ✅ Buttons */}
                            <button className="clearcart-btn" onClick={handleClearCart}>🗑️ Clear Cart</button>
                            <button className="checkout-btn" onClick={() => navigate("/checkout/delivery")}>Proceed to Checkout</button>
                            <button className="continue-btn" onClick={() => navigate("/mens")}>
                                ⬅️ Continue Shopping
                            </button>
                        </div>
                    </div>
                )}

                {/* ✅ Toast */}
                {toast && (
                    <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
                )}
            </section>
        </>
    );
};

export default Cart;
