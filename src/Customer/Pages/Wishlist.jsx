import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import Toast from "../Components/Toaster/Toast";
import { useCart } from "../Context/CartContext";   // ✅ import cart context
import "../Styles/Wishlist.css";

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState([]);
    const [toast, setToast] = useState(null);
    const { addToCart } = useCart();  // ✅ get addToCart from context

    // Load wishlist from localStorage
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
    }, []);

    // Show toast helper
    const showToast = (type, message) => {
        setToast({ type, message });
    };

    // Remove item from wishlist
    const removeFromWishlist = (id) => {
        const updated = wishlist.filter((item) => item.id !== id);
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        showToast("error", "❌ Removed from Wishlist");
    };

    // Move item to cart (now using context)
    const handleAddToCart = (item) => {
        try {
            addToCart(item);                 // ✅ use global cart context
            removeFromWishlist(item.id);     // remove from wishlist
            showToast("success", `✅ ${item.name} added to Cart`);
        } catch (error) {
            showToast("warning", "⚠️ Something went wrong");
        }
    };

    return (
        <div className="wishlist-container">
            <h1 className="wishlist-title">❤️ My Wishlist</h1>

            {wishlist.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="wishlist-empty"
                >
                    Your wishlist is empty... start adding your favorite fits ✨
                </motion.div>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="wishlist-card"
                        >
                            {/* Product Image */}
                            <div className="wishlist-img-container">
                                <img
                                    src={item.images?.[0]}   // ✅ fixed: use first image
                                    alt={item.name}
                                    className="wishlist-img"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="wishlist-info">
                                <div>
                                    <h3 className="wishlist-name">{item.name}</h3>
                                    <p className="wishlist-price">${item.price}</p>
                                </div>

                                {/* Buttons */}
                                <div className="wishlist-actions">
                                    <button
                                        onClick={() => handleAddToCart(item)} // ✅ fixed
                                        className="btn-add"
                                    >
                                        <FaShoppingCart /> Add to Cart
                                    </button>
                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="btn-remove"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Toast Notification */}
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}
