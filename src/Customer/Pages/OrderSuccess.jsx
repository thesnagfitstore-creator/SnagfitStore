import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from "jspdf";

import Navbar from "../Components/Navigation/Navbar";
import Footer from "../Components/Footer/Footer";
import { useCart } from "../Context/CartContext";
import "../Styles/OrderSuccess.css";

const OrderSuccess = () => {
    const navigate = useNavigate();
    const { cart } = useCart();

    const [orderId, setOrderId] = useState("");
    useEffect(() => {
        const id = "ORD" + Math.floor(100000 + Math.random() * 900000);
        setOrderId(id);
    }, []);

    // Delivery dates
    const today = new Date();
    const minDelivery = new Date(today);
    minDelivery.setDate(today.getDate() + 3);
    const maxDelivery = new Date(today);
    maxDelivery.setDate(today.getDate() + 5);
    const formatDate = (date) =>
        date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = subtotal >= 500 ? 0 : subtotal > 0 ? 50 : 0;
    const tax = subtotal * 0.1;
    const grandTotal = subtotal + shipping + tax;

    const downloadInvoice = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Invoice", 14, 20);
        doc.setFontSize(12);
        doc.text(`Order ID: ${orderId}`, 14, 30);
        doc.text(`Estimated Delivery: ${formatDate(minDelivery)} - ${formatDate(maxDelivery)}`, 14, 38);
        doc.text("Items:", 14, 48);

        let y = 55;
        cart.forEach((item) => {
            doc.text(`${item.name} - ${item.qty} x $${item.price.toFixed(2)} = $${(item.price * item.qty).toFixed(2)}`, 14, y);
            y += 8;
        });

        doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 14, y + 5);
        doc.text(`Shipping: ${shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}`, 14, y + 13);
        doc.text(`Tax (10%): $${tax.toFixed(2)}`, 14, y + 21);
        doc.text(`Grand Total: $${grandTotal.toFixed(2)}`, 14, y + 29);

        doc.save(`${orderId}_invoice.pdf`);
    };

    return (
        <>
            <Navbar />
            <section id="order-success-page">
                <h2>✅ Thank you for your order!</h2>

                {/* Stepper */}
                <div className="checkout-stepper">
                    <div className={`step completed`}><span><FontAwesomeIcon icon={faCheckCircle} /> Login</span></div>
                    <div className={`step completed`}><span><FontAwesomeIcon icon={faCheckCircle} /> Delivery</span></div>
                    <div className={`step completed`}><span><FontAwesomeIcon icon={faCheckCircle} /> Order Summary</span></div>
                    <div className={`step completed`}><span><FontAwesomeIcon icon={faCheckCircle} /> Payment</span></div>
                    <div className={`step active`}><span><FontAwesomeIcon icon={faShoppingBag} /> Success</span></div>
                </div>

                {/* Progress bar */}
                <div className="step-progress">
                    <div className="step-progress-fill" style={{ width: "100%" }}></div>
                </div>

                <div className="success-content">
                    <p className="order-id">🆔 Order ID: <strong>{orderId}</strong></p>
                    <p className="delivery-date">Estimated Delivery: <strong>{formatDate(minDelivery)} - {formatDate(maxDelivery)}</strong></p>

                    {/* Purchased Items */}
                    {cart.length > 0 && (
                        <div className="purchased-items">
                            <h3>Purchased Items</h3>
                            {cart.map(item => (
                                <div className="order-card" key={item.id}>
                                    <img src={item.images[0]} alt={item.name} />
                                    <div className="order-info">
                                        <h4>{item.name}</h4>
                                        <p>${item.price.toFixed(2)} x {item.qty}</p>
                                        <p><strong>Line Total: ${(item.price * item.qty).toFixed(2)}</strong></p>
                                    </div>
                                </div>
                            ))}
                            <hr />
                            <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
                            <p>Shipping: <strong>{shipping === 0 ? "FREE 🚚" : `$${shipping.toFixed(2)}`}</strong></p>
                            <p>Tax (10%): <strong>${tax.toFixed(2)}</strong></p>
                            <p className="grand-total">Grand Total: <strong>${grandTotal.toFixed(2)}</strong></p>
                        </div>
                    )}

                    <div className="success-buttons">
                        <button className="download-btn" onClick={downloadInvoice}>📄 Download Invoice</button>
                        <button className="my-orders-btn" onClick={() => navigate("/my-orders")}>📦 Go to My Orders</button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default OrderSuccess;
