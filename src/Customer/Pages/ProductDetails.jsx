// src/Customer/Pages/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import productData from "../../Data/product";
import { FaWhatsapp } from "react-icons/fa";
import "../Styles/ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = productData.find((p) => p.id.toString() === id);

    const [wishlist, setWishlist] = useState([]);
    const [mainImage, setMainImage] = useState(product?.images[0]);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [toast, setToast] = useState({ message: "", type: "" });

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(stored);
    }, []);

    const toggleWishlist = (item) => {
        let updated;
        if (wishlist.some((p) => p.id === item.id)) {
            updated = wishlist.filter((p) => p.id !== item.id);
            setToast({ message: "💔 Removed from Wishlist", type: "error" });
        } else {
            updated = [...wishlist, item];
            setToast({ message: "❤️ Added to Wishlist", type: "wishlist" });
        }
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };

    const handleAddToCart = () => {
        if (product.stock <= 0) {
            setToast({ message: "❌ Out of Stock", type: "error" });
            return;
        }

        if (!selectedSize) {
            setToast({ message: "⚠️ Please select a size", type: "error" });
            return;
        }

        addToCart({ ...product, quantity, size: selectedSize });
        setToast({ message: "✅ Added to Cart", type: "success" });
    };

    const handleShare = () => {
        const shareText = `🛍️ Check out this product: ${product.name} - $${product.price}\n${window.location.href}`;
        const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappURL, "_blank");
    };

    if (!product) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Product not found</h2>
                <button className="back-btn" onClick={() => navigate("/mens")}>
                    ← Back to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="productdetails-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="productdetails-box">
                {/* ✅ Product Image Gallery */}
                <div className="productdetails-gallery">
                    <img src={mainImage} alt={product.name} className="main-img" />
                    {/* ✅ Swipeable Thumbnail Row */}
                    <div className="thumbnail-row swipeable">
                        {product.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${product.name}-${idx}`}
                                className={`thumb-img ${mainImage === img ? "active" : ""}`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* ✅ Product Info */}
                <div className="productdetails-info">
                    <h2 className="pd-title">{product.name}</h2>
                    <p className="pd-brand">{product.brand}</p>
                    <p className="pd-price">${product.price}</p>
                    <p className="pd-desc">{product.description}</p>

                    {/* ✅ Stock Status */}
                    <p className={`pd-stock ${product.stock > 0 ? "in-stock" : "out-stock"}`}>
                        {product.stock > 0
                            ? `In Stock (${product.stock} available)`
                            : "Out of Stock"}
                    </p>

                    {product.stock > 0 && (
                        <>
                            {/* Size Selector */}
                            <div className="pd-option">
                                <label>Size:</label>
                                <select
                                    value={selectedSize}
                                    onChange={(e) => setSelectedSize(e.target.value)}
                                >
                                    <option value="">Select Size</option>
                                    {product.size?.map((s, idx) => (
                                        <option key={idx} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Quantity Selector */}
                            <div className="pd-option quantity-selector">
                                <label>Quantity:</label>
                                <button
                                    type="button"
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                >
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button
                                    type="button"
                                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                                >
                                    +
                                </button>
                            </div>
                        </>
                    )}

                    {/* ✅ Desktop Buttons */}
                    <div className="pd-actions desktop-actions">
                        <button
                            className="pd-btn add"
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0}
                        >
                            {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                        </button>

                        <button
                            className={`pd-btn wishlist ${wishlist.some((p) => p.id === product.id) ? "active" : ""
                                }`}
                            onClick={() => toggleWishlist(product)}
                        >
                            {wishlist.some((p) => p.id === product.id)
                                ? "Remove from Wishlist"
                                : "Add to Wishlist"}
                        </button>

                        <button className="pd-btn share" onClick={handleShare}>
                            <FaWhatsapp className="share-icon" /> Share
                        </button>
                    </div>
                </div>
            </div>

            {/* ✅ Sticky Bottom Bar (Mobile Only) */}
            {product.stock > 0 && (
                <div className="sticky-bar">
                    <button className="sticky-add-btn" onClick={handleAddToCart}>
                        🛒 Add to Cart
                    </button>
                </div>
            )}

            {/* ✅ Toast */}
            {toast.message && (
                <div className={`toast ${toast.type}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
