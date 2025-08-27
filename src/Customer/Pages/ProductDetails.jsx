import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import productData from "../../Data/product";
import "../Styles/ProductDetails.css";
import { FaWhatsapp } from "react-icons/fa";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = productData.find((p) => p.id.toString() === id);

    const [wishlist, setWishlist] = useState([]);
    const [mainImage, setMainImage] = useState(product?.images[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    // ✅ Swipe state
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // ✅ Toast state
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

    // ✅ WhatsApp Share
    const handleShareWhatsApp = () => {
        const shareText = `Check out this product: ${product.name} - $${product.price}\n${window.location.href}`;
        const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(url, "_blank");
    };

    // ✅ Handle Swipe
    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            // swipe left
            const nextIndex = (currentIndex + 1) % product.images.length;
            setCurrentIndex(nextIndex);
            setMainImage(product.images[nextIndex]);
        }

        if (touchEnd - touchStart > 75) {
            // swipe right
            const prevIndex =
                (currentIndex - 1 + product.images.length) % product.images.length;
            setCurrentIndex(prevIndex);
            setMainImage(product.images[prevIndex]);
        }
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
                    {/* Desktop → Single Main Image */}
                    <img
                        src={mainImage}
                        alt={product.name}
                        className="main-img desktop-only"
                    />

                    {/* Mobile → Swipeable Carousel */}
                    <div
                        className="main-img-carousel mobile-only"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="carousel-img"
                        />
                    </div>

                    {/* ✅ Thumbnails */}
                    <div
                        className={`thumbnail-row ${window.innerWidth <= 768 ? "swipeable" : ""
                            }`}
                    >
                        {product.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${product.name}-${idx}`}
                                className={`thumb-img ${mainImage === img ? "active" : ""}`}
                                onClick={() => {
                                    setMainImage(img);
                                    setCurrentIndex(idx);
                                }}
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
                    <p
                        className={`pd-stock ${product.stock > 0 ? "in-stock" : "out-stock"
                            }`}
                    >
                        {product.stock > 0
                            ? `In Stock (${product.stock} available)`
                            : "Out of Stock"}
                    </p>

                    {/* ✅ Show selectors only if product in stock */}
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
                                    {product.size?.map((size, idx) => (
                                        <option key={idx} value={size}>
                                            {size}
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
                                    onClick={() =>
                                        setQuantity((q) => Math.min(product.stock, q + 1))
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </>
                    )}

                    {/* ✅ Buttons (desktop-only Add to Cart, wishlist + WhatsApp) */}
                    <div className="pd-actions">
                        <button
                            className="pd-btn add desktop-only"
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

                        {/* ✅ WhatsApp Share (desktop) */}
                        <button className="pd-btn whatsapp" onClick={handleShareWhatsApp}>
                            <FaWhatsapp size={18} /> Share
                        </button>
                    </div>
                </div>
            </div>

            {/* ✅ Sticky Bottom Add to Cart (Mobile Only) */}
            <div className="sticky-bar mobile-only">
                <button
                    className="sticky-add-btn"
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                >
                    {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                </button>

                {/* ✅ WhatsApp Share (mobile sticky bar) */}
                <button className="sticky-share-btn" onClick={handleShareWhatsApp}>
                    <FaWhatsapp size={20} /> Share
                </button>
            </div>

            {/* ✅ Toast */}
            {toast.message && (
                <div className={`toast ${toast.type}`}>{toast.message}</div>
            )}
        </div>
    );
};

export default ProductDetails;
