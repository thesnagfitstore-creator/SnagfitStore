// src/Customer/Pages/Cart.jsx
import React, { useState } from "react";
import Navbar from "../Components/Navigation/Navbar";
import { useCart } from "../Context/CartContext";
import Toast from "../Components/Toaster/Toast";
import "../Styles/Cart.css";

const Cart = () => {
    const { cart, removeFromCart, updateQty, clearCart } = useCart();
    const [toast, setToast] = useState(null);

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    // ✅ Toast helper
    const showToast = (type, message) => {
        setToast({ type, message });
    };

    // ✅ Move to Wishlist using localStorage
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

            removeFromCart(item.id); // ✅ remove from cart after moving
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


                        <div className="cart-summary">
                            <h3>Order Summary</h3>
                            <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>

                            {/* ✅ Clear Cart Button */}
                            <button className="clearcart-btn" onClick={handleClearCart}>
                                🗑️ Clear Cart
                            </button>

                            <button className="checkout-btn">Proceed to Checkout</button>
                        </div>
                    </div>
                )}

                {/* ✅ Toast notification */}
                {toast && (
                    <Toast
                        type={toast.type}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                )}
            </section>
        </>
    );
};

export default Cart;
