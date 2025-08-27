import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaShoppingCart, FaWhatsapp, FaShareAlt } from "react-icons/fa";
import Toast from "../Components/Toaster/Toast";
import { useCart } from "../Context/CartContext";
import "../Styles/Wishlist.css";

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState([]);
    const [toast, setToast] = useState(null);
    const { addToCart } = useCart();

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

    // Move item to cart
    const handleAddToCart = (item) => {
        try {
            addToCart(item);
            removeFromWishlist(item.id);
            showToast("success", `✅ ${item.name} added to Cart`);
        } catch (error) {
            showToast("warning", "⚠️ Something went wrong");
        }
    };

    // ✅ Copy wishlist page link
    const copyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        showToast("success", "🔗 Wishlist link copied!");
    };

    // ✅ Share via WhatsApp
    const shareWhatsApp = () => {
        const url = window.location.href;
        const text = `Check out my wishlist! ❤️\n${url}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
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
                <>
                    {/* Share Buttons */}
                    <div className="wishlist-share">
                        <button className="btn-share" onClick={copyLink}>
                            <FaShareAlt /> Copy Link
                        </button>
                        <button className="btn-whatsapp" onClick={shareWhatsApp}>
                            <FaWhatsapp /> Share via WhatsApp
                        </button>
                    </div>

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
                                        src={item.images?.[0]}
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
                                            onClick={() => handleAddToCart(item)}
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
                </>
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
