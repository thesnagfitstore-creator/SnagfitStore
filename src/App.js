// src/App.js
import React from "react";
import Navbar from "./Customer/Components/Navigation/Navbar";
import Footer from "./Customer/Components/Footer/Footer";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CartProvider } from "./Customer/Context/CartContext";
import { Routes, Route } from "react-router-dom";
import Home from "./Customer/Pages/Home";
import About from "./Customer/Pages/About";
import Mens from "./Customer/Pages/Mens";
import Womens from "./Customer/Pages/Womens";
import Unisex from "./Customer/Pages/Unisex";
import ContactUS from "./Customer/Pages/Contactus";
import Wishlist from "./Customer/Pages/Wishlist";
import Cart from "./Customer/Pages/Cart";
import SignUp from "./Customer/Pages/SignUp";
import Login from "./Customer/Pages/Login";
import ForgotPassword from "./Customer/Pages/ForgotPassword";
import ProductDetails from "./Customer/Pages/ProductDetails";
import DeliveryAddress from "./Customer/Pages/DeliveryAddress";
import OrderSummary from "./Customer/Pages/OrderSummary";

export default function App() {
  return (
    <CartProvider>
      {/* ✅ Now Cart context is available to ALL components */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mens" element={<Mens />} />
        <Route path="/womens" element={<Womens />} />
        <Route path="/unisex" element={<Unisex />} />
        <Route path="/contact" element={<ContactUS />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} /> {/* ✅ Cart Page */}
        <Route path="/order-summary" element={<OrderSummary />} /> {/* ✅ Added OrderSummary Page */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/checkout/delivery" element={<DeliveryAddress />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}
