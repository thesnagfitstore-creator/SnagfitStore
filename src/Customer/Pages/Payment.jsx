import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

import Navbar from "../Components/Navigation/Navbar";
import { useCart } from "../Context/CartContext";
import Toast from "../Components/Toaster/Toast";
import "../Styles/Payment.css";

const Payment = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  // Load addresses
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [billingAddress, setBillingAddress] = useState(null);

  useEffect(() => {
    const savedDelivery = localStorage.getItem("deliveryAddress");
    if (savedDelivery) setDeliveryAddress(JSON.parse(savedDelivery));

    const savedBilling = localStorage.getItem("billingAddress");
    if (savedBilling) setBillingAddress(JSON.parse(savedBilling));
  }, []);

  // Stepper
  const completedStep = 3; // Payment step
  const steps = [
    { name: "Login", path: "/" },
    { name: "Delivery Address", path: "/checkout/delivery" },
    { name: "Order Summary", path: "/checkout/order-summary" },
    { name: "Payment", path: "/checkout/payment" },
  ];
  const handleStepClick = (index) => {
    if (index < completedStep) navigate(steps[index].path);
  };

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal >= 500 ? 0 : subtotal > 0 ? 50 : 0;
  const taxPercent = 10;
  const tax = (subtotal * taxPercent) / 100;
  const grandTotal = subtotal + shipping + tax;

  const showToast = (type, message) => setToast({ type, message });

  // Helper to save order
  const placeOrder = (method) => {
    if (cart.length === 0) {
      showToast("error", "Your cart is empty!");
      return;
    }

    const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);

    const order = {
      orderId,
      date: new Date(),
      status: "Completed",
      cart,
      subtotal,
      shipping,
      tax,
      taxPercent,
      grandTotal,
      paymentMethod: method,
      billingAddress: billingAddress || null,
      deliveryAddress: deliveryAddress || null,
    };

    // Save last order
    localStorage.setItem("lastOrder", JSON.stringify(order));

    // Save order history
    const previousOrders =
      JSON.parse(localStorage.getItem("ordersHistory")) || [];
    localStorage.setItem(
      "ordersHistory",
      JSON.stringify([order, ...previousOrders])
    );

    clearCart();
    navigate("/order-success");
  };

  return (
    <>
      <Navbar />

      <section id="payment-page">
        <h2>Payment</h2>

        {/* Stepper */}
        <div className="checkout-stepper">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step ${completedStep > index ? "completed" : ""} ${
                completedStep === index ? "active" : ""
              }`}
              onClick={() => handleStepClick(index)}
              style={{ cursor: index < completedStep ? "pointer" : "default" }}
            >
              <span>
                <FontAwesomeIcon
                  icon={completedStep > index ? faCheckCircle : faMapMarkerAlt}
                />{" "}
                {step.name}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="step-progress">
          <div
            className="step-progress-fill"
            style={{ width: `${((completedStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        <div className="payment-container">
          {/* Payment Options */}
          <div className="payment-options">
            <h3>Select Payment Method</h3>
            <button
              className="online-btn"
              onClick={() => placeOrder("Online Payment")}
            >
              💳 Pay Online
            </button>
            <button
              className="cod-btn"
              onClick={() => placeOrder("Cash on Delivery")}
            >
              🛵 Cash on Delivery
            </button>
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty 🛒</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div className="order-card" key={item.id || item.sku}>
                    {item.images && item.images[0] ? (
                      <img src={item.images[0]} alt={item.name} />
                    ) : (
                      <div className="thumb placeholder" />
                    )}
                    <div className="order-info">
                      <h4>{item.name}</h4>
                      <p>
                        ${item.price.toFixed(2)} x {item.qty}
                      </p>
                      <p>
                        <strong>
                          Line Total: ${(item.price * item.qty).toFixed(2)}
                        </strong>
                      </p>
                    </div>
                  </div>
                ))}
                <hr />
                <p>
                  Subtotal: <strong>${subtotal.toFixed(2)}</strong>
                </p>
                <p>
                  Shipping:{" "}
                  <strong>
                    {shipping === 0 ? "FREE 🚚" : `$${shipping.toFixed(2)}`}
                  </strong>
                </p>
                <p>
                  Tax ({taxPercent}%): <strong>${tax.toFixed(2)}</strong>
                </p>
                <p className="grand-total">
                  Grand Total: <strong>${grandTotal.toFixed(2)}</strong>
                </p>

                {/* Delivery Address */}
                {deliveryAddress && (
                  <div className="delivery-preview">
                    <h4>Delivery Address</h4>
                    <p>
                      <strong>{deliveryAddress.name}</strong>
                    </p>
                    <p>
                      {deliveryAddress.address}, {deliveryAddress.city}
                    </p>
                    <p>
                      {deliveryAddress.state} - {deliveryAddress.zip}
                    </p>
                    <p>{deliveryAddress.phone}</p>

                    {/* Change Address button */}
                    <button
                      className="change-address-bttn"
                      onClick={() => navigate("/checkout/delivery")}
                    >
                      ✏️ Change Address
                    </button>
                  </div>
                )}

                {/* Billing Address */}
                {billingAddress && (
                  <div className="delivery-preview">
                    <h4>Billing Address</h4>
                    <p>
                      <strong>{billingAddress.name}</strong>
                    </p>
                    <p>
                      {billingAddress.address}, {billingAddress.city}
                    </p>
                    <p>
                      {billingAddress.state} - {billingAddress.zip}
                    </p>
                    <p>{billingAddress.phone}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </section>
    </>
  );
};

export default Payment;
