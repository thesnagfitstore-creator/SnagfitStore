import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
    FaSearch,
    FaHeart,
    FaUser,
    FaShoppingCart,
    FaChevronDown,
    FaTimes,
    FaBars,
    FaSignInAlt,
    FaUserPlus
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../../assets/logo/logo.png";

const navItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Mens", to: "/mens" },
    { label: "Womens", to: "/womens" },
    { label: "Unisex", to: "/unisex" },
    { label: "Contact", to: "/contact" },
];

export default function Navbar() {
    const [showSearch, setShowSearch] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#f7f3e3] shadow-md border-b border-gray-200 z-50">
            <div className="px-6 py-3 flex items-center justify-between relative">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="SnagFit" className="h-12 w-auto" />
                </Link>

                {/* Menu for Desktop */}
                <ul className="hidden lg:flex gap-6 font-semibold text-lg">
                    {navItems.map((item) => (
                        <li key={item.to} className="relative">
                            <NavLink to={item.to} className="group">
                                {({ isActive }) => (
                                    <span
                                        className={`relative px-4 py-2 rounded-lg transition duration-300 ease-in-out
                      ${isActive
                                                ? "bg-[#441515] text-white"
                                                : "text-[#441515] hover:text-red-600"}`}
                                    >
                                        {item.label}
                                    </span>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Icons */}
                <div className="flex items-center gap-5 text-[#441515] text-xl relative">
                    {/* Search Toggle */}
                    <div className="flex items-center relative">
                        <button
                            onClick={() => setShowSearch((prev) => !prev)}
                            className="cursor-pointer hover:text-red-500 hover:scale-110 transition"
                            aria-label="Search"
                        >
                            <FaSearch />
                        </button>

                        {/* Search Box */}
                        <AnimatePresence>
                            {showSearch && (
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute right-10 flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-3 py-1 w-64"
                                >
                                    <input
                                        type="text"
                                        placeholder="SEARCH PRODUCTS, MENS, WOMENS..."
                                        autoFocus
                                        className="flex-1 text-sm p-2 outline-none"
                                    />
                                    <button
                                        onClick={() => setShowSearch(false)}
                                        className="ml-2 text-gray-500 hover:text-red-500"
                                    >
                                        <FaTimes />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Wishlist */}
                    <Link
                        to="/wishlist"
                        className="hover:text-red-500 hover:scale-110 transition"
                        aria-label="Wishlist"
                    >
                        <FaHeart />
                    </Link>

                    {/* Profile with Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >
                        <button
                            className="flex items-center gap-1 hover:text-red-500 hover:scale-110 transition"
                            aria-label="Account"
                        >
                            <FaUser />
                            <FaChevronDown className="text-sm" />
                        </button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                            {showDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden z-50"
                                >
                                    <Link
                                        to="/login"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600"
                                    >
                                        Sign Up
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600"
                                    >
                                        My Profile
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="relative hover:text-red-500 hover:scale-110 transition"
                        aria-label="Cart"
                    >
                        <FaShoppingCart />
                        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                            3
                        </span>
                    </Link>

                    {/* Hamburger for Mobile */}
                    <button
                        onClick={() => setShowMenu(true)}
                        className="lg:hidden hover:text-red-500"
                    >
                        <FaBars />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.4 }}
                        className="fixed top-0 right-0 w-72 h-full bg-[#f7f3e3] shadow-lg z-50 flex flex-col"
                    >
                        <div className="flex justify-end p-4">
                            <button onClick={() => setShowMenu(false)}>
                                <FaTimes className="text-2xl hover:text-red-500" />
                            </button>
                        </div>
                        <ul className="flex flex-col gap-5 px-6 text-lg font-semibold">
                            {navItems.map((item) => (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        onClick={() => setShowMenu(false)}
                                        className="hover:text-red-500 transition"
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                            <li className="flex items-center gap-3 hover:text-red-500">
                                <FaSignInAlt /> Login
                            </li>
                            <li className="flex items-center gap-3 hover:text-red-500">
                                <FaUserPlus /> Sign Up
                            </li>
                            <li className="flex items-center gap-3 text-red-500 bg-red-100 px-3 py-2 rounded-lg">
                                <FaUser /> Account
                            </li>
                            <li className="flex items-center gap-3 hover:text-red-500">
                                <FaHeart /> Wishlist (0)
                            </li>
                            <li className="flex items-center gap-3 hover:text-red-500">
                                <FaShoppingCart /> Cart (3)
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
