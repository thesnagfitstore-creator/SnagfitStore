// src/Customer/Pages/Mens.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../Context/CartContext";
import Navbar from "../Components/Navigation/Navbar";
import Toast from "../Components/Toaster/Toast";
import "../Styles/Mens.css";
import "../Styles/WishlistIcon.css";
import product from "../../Data/product";

const Mens = () => {
    // ✅ Filters state
    const [priceFilter, setPriceFilter] = useState(200);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const [inStockOnly, setInStockOnly] = useState(false);

    // Temporary filter state (until Apply is clicked)
    const [tempSizes, setTempSizes] = useState([]);
    const [tempPrice, setTempPrice] = useState(200);
    const [tempDiscounts, setTempDiscounts] = useState([]);
    const [tempInStock, setTempInStock] = useState(false);

    // Collapsible sections
    const [openSections, setOpenSections] = useState({
        size: false,
        price: false,
        discount: false,
        availability: false,
    });

    const toggleSection = (section) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    // ✅ Mobile filter toggle
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Mens products
    const mensProducts = product.filter((p) => p.category === "mens");

    // Apply filters
    const handleApplyFilters = () => {
        setSelectedSizes(tempSizes);
        setPriceFilter(tempPrice);
        setSelectedDiscounts(tempDiscounts);
        setInStockOnly(tempInStock);
        setMobileFiltersOpen(false); // close sidebar on mobile after applying
    };

    // Filtering logic
    const filteredProducts = mensProducts.filter((product) => {
        if (product.price > priceFilter) return false;
        if (selectedSizes.length > 0 && !selectedSizes.some((s) => product.size.includes(s))) return false;
        if (selectedDiscounts.length > 0 && !selectedDiscounts.some((d) => product.discount >= d)) return false;
        if (inStockOnly && !product.inStock) return false;
        return true;
    });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

    // ✅ Wishlist Logic
    const [wishlist, setWishlist] = useState([]);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
    }, []);

    // Add/Remove Wishlist
    const toggleWishlist = (item) => {
        let updatedWishlist;
        if (wishlist.some((p) => p.id === item.id)) {
            updatedWishlist = wishlist.filter((p) => p.id !== item.id);
            setToast({ message: "Removed from Wishlist 💔", type: "error" });
        } else {
            updatedWishlist = [...wishlist, item];
            setToast({ message: "Added to Wishlist ❤️", type: "success" });
        }
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    // ✅ Use Cart Context
    const { addToCart } = useCart();

    return (
        <>
            <Navbar />
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Hero */}
            <section id="page-header">
                <div className="hero-text">
                    <h2>#OWNYOURVIBE</h2>
                    <p>Exclusive streetwear drops & deals up to 70% off</p>
                </div>
            </section>

            {/* Shop Layout */}
            <section id="product1">
                <div className="shop-layout">
                    {/* 🟢 Mobile Toggle Button */}
                    <button
                        className="mobile-filter-btn"
                        onClick={() => setMobileFiltersOpen(true)}
                    >
                        Filters By
                    </button>

                    {/* Sidebar */}
                    <aside className={`shop-filters ${mobileFiltersOpen ? "open" : ""}`}>
                        <button
                            className="close-filters-btn"
                            onClick={() => setMobileFiltersOpen(false)}
                        >
                            ✖
                        </button>

                        {/* Size */}
                        <div className={`filter-section ${openSections.size ? "open" : ""}`}>
                            <h5 onClick={() => toggleSection("size")}>
                                Size <span>{openSections.size ? "−" : "+"}</span>
                            </h5>
                            {openSections.size && (
                                <div className="filter-content">
                                    {["XS", "S", "M", "L", "XL"].map((size) => (
                                        <label key={size}>
                                            <input
                                                type="checkbox"
                                                value={size}
                                                checked={tempSizes.includes(size)}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setTempSizes((prev) =>
                                                        checked ? [...prev, size] : prev.filter((s) => s !== size)
                                                    );
                                                }}
                                            />{" "}
                                            {size}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Price */}
                        <div className={`filter-section ${openSections.price ? "open" : ""}`}>
                            <h5 onClick={() => toggleSection("price")}>
                                Price Range <span>{openSections.price ? "−" : "+"}</span>
                            </h5>
                            {openSections.price && (
                                <div className="filter-content">
                                    <input
                                        type="range"
                                        min="0"
                                        max="200"
                                        step="10"
                                        value={tempPrice}
                                        onChange={(e) => setTempPrice(Number(e.target.value))}
                                    />
                                    <div>Up to ${tempPrice}</div>
                                </div>
                            )}
                        </div>

                        {/* Discount */}
                        <div className={`filter-section ${openSections.discount ? "open" : ""}`}>
                            <h5 onClick={() => toggleSection("discount")}>
                                Discount <span>{openSections.discount ? "−" : "+"}</span>
                            </h5>
                            {openSections.discount && (
                                <div className="filter-content">
                                    {[10, 20, 30, 50].map((d) => (
                                        <label key={d}>
                                            <input
                                                type="checkbox"
                                                value={d}
                                                checked={tempDiscounts.includes(d)}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setTempDiscounts((prev) =>
                                                        checked ? [...prev, d] : prev.filter((x) => x !== d)
                                                    );
                                                }}
                                            />{" "}
                                            {d}% or more
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Availability */}
                        <div className={`filter-section ${openSections.availability ? "open" : ""}`}>
                            <h5 onClick={() => toggleSection("availability")}>
                                Availability <span>{openSections.availability ? "−" : "+"}</span>
                            </h5>
                            {openSections.availability && (
                                <div className="filter-content">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={tempInStock}
                                            onChange={(e) => setTempInStock(e.target.checked)}
                                        />{" "}
                                        In Stock Only
                                    </label>
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <button className="apply-btn" onClick={handleApplyFilters}>
                            Apply Filters
                        </button>
                        <button
                            className="apply-btn"
                            style={{ background: "#636e72", marginTop: "10px" }}
                            onClick={() => {
                                setTempSizes([]);
                                setTempPrice(200);
                                setTempDiscounts([]);
                                setTempInStock(false);

                                setSelectedSizes([]);
                                setPriceFilter(200);
                                setSelectedDiscounts([]);
                                setInStockOnly(false);
                            }}
                        >
                            Clear Filters
                        </button>
                    </aside>

                    {/* Products Grid */}
                    <div className="product-grid">
                        {currentProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <Link to={`/product/${product.id}`}>
                                    <img src={product.images[0]} alt={product.name} />
                                </Link>
                                <div className="des">
                                    <span>{product.brand}</span>
                                    <h5>
                                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                                    </h5>
                                    <h4>${product.price}</h4>
                                </div>

                                {/* Cart + Wishlist Buttons */}
                                <div className="card-actions">
                                    <button
                                        className="cart-btn"
                                        onClick={() => {
                                            addToCart(product);
                                            setToast({ message: "✅ Added to Cart", type: "success" });
                                        }}
                                    >
                                        <FaShoppingCart />
                                    </button>
                                    <button
                                        className={`wishlist-btn ${wishlist.some((p) => p.id === product.id) ? "active" : ""}`}
                                        onClick={() => toggleWishlist(product)}
                                    >
                                        <FaHeart />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pagination */}
            <div className="pagination-container">
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        &laquo;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            onClick={() => setCurrentPage(num)}
                            className={currentPage === num ? "active" : ""}
                        >
                            {num}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        &raquo;
                    </button>
                </div>
            </div>
        </>
    );
};

export default Mens;
