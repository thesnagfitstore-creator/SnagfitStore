import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navigation/Navbar";
import "../Styles/OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <>
        <Navbar />
        <section id="order-success-page">
          <h2>No order found</h2>
          <p>Please place an order first.</p>
          <button onClick={() => navigate("/")}>Go to Shop</button>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section id="order-success-page">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              "--i": Math.random(),
              "--color": `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
              "--x": `${Math.random() * 100}%`,
              "--size": `${Math.random() * 8 + 4}px`,
              "--delay": `${Math.random() * 2}s`,
              "--duration": `${Math.random() * 3 + 2}s`,
            }}
          ></div>
        ))}

        <div className="success-box">
          <div className="success-icon">
            <svg viewBox="0 0 52 52" className="checkmark">
              <circle
                className="checkmark-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark-check"
                fill="none"
                d="M14 27l7 7 16-16"
              />
            </svg>
          </div>

          <h2>🎉 Order Placed Successfully!</h2>
          <p className="order-id">
            Your order has been confirmed. <br />
            🆔 <strong>{order.orderId}</strong>
          </p>

          <div className="success-buttons">
            <button
              className="download-btn"
              onClick={() => navigate("/invoice")}
            >
              📄 Download Invoice
            </button>
            <button
              className="my-orders-btn"
              onClick={() => navigate("/my-orders")}
            >
              📦 View My Orders
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderSuccess;
