import React from "react";
import Navbar from "./Customer/Components/Navigation/Navbar";
import Footer from "./Customer/Components/Footer/Footer";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Routes, Route } from "react-router-dom";
import Home from "./Customer/Pages/Home";
import About from "./Customer/Pages/About";
import Mens from "./Customer/Pages/Mens";
import Womens from "./Customer/Pages/Womens";
import Unisex from "./Customer/Pages/Unisex";
import ContactUS from "./Customer/Pages/Contactus";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Mens page */}
        <Route path="/mens" element={<Mens />} />
        <Route path="/womens" element={<Womens />} />
        <Route path="/unisex" element={<Unisex />} />
        <Route path="/contact" element={<ContactUS />} />
      </Routes>
      <Footer />
    </>
  );
}
