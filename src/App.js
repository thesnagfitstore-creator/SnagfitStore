import React from "react";
import Navbar from "./Customer/Components/Navigation/Navbar";
import Footer from "./Customer/Components/Footer/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
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
import Payment from "./Customer/Pages/Payment";
import OrderSuccess from "./Customer/Pages/OrderSuccess";
import InvoicePage from "./Customer/Pages/InvoicePage";
import MyOrdersPage from "./Customer/Pages/MyOrdersPage";
import MyProfilePage from "./Customer/Pages/MyProfilePage";
import SizeGuidePage from "./Customer/Pages/SizeGuidePage";
import ReturnsRefunds from "./Customer/Pages/ReturnsRefunds";
import TermsPrivacyPage from "./Customer/Pages/TermsPrivacyPage";

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mens" element={<Mens />} />
        <Route path="/womens" element={<Womens />} />
        <Route path="/unisex" element={<Unisex />} />
        <Route path="/contact" element={<ContactUS />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/checkout/delivery" element={<DeliveryAddress />} />
        <Route path="/checkout/payment" element={<Payment />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/profile" element={<MyProfilePage />} />
        <Route path="/size-guide" element={<SizeGuidePage />} />{" "}
        <Route path="/returns-refunds" element={<ReturnsRefunds />} />
        <Route path="/terms" element={<TermsPrivacyPage />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}
