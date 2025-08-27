// src/Customer/Pages/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import productData from "../../Data/product";
import Toast from "../Components/Toaster/Toast"; // ✅ Import Toast
import "../Styles/ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = productData.find((p) => p.id.toString() === id);

    const [wishlist, setWishlist] = useState([]);
    const [mainImage, setMainImage] = useState(product?.images[0]);
    const [toast, setToast] = useState(null); // ✅ Toast state

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
            {/* ✅ Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="productdetails-box">
                {/* ✅ Product Image Gallery */}
                <div className="productdetails-gallery">
                    <img src={mainImage} alt={product.name} className="main-img" />

                    <div className="thumbnail-row">
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

                    <div className="pd-actions">
                        <button
                            className="pd-btn add"
                            onClick={() => {
                                addToCart(product);
                                setToast({ message: "✅ Added to Cart", type: "success" });
                            }}
                        >
                            Add to Cart
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
