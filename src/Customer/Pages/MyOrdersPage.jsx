import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navigation/Navbar";
import Footer from "../Components/Footer/Footer";
import "../Styles/MyOrdersPage.css";

// Currency formatting
const formatCurrency = (n) => `$${Number(n).toFixed(2)}`;

// Status messages
const STATUS_MESSAGES = {
  ordered: "Will be packaged and shipped soon",
  shipped: "Your package is on the way",
  "out-for-delivery": "Arriving today!",
  delivered: "Thank you for shopping with us",
  cancelled: "Your order was cancelled",
  returned: "Refund in progress",
};

// Timeline steps
const ORDER_STEPS = ["ordered", "shipped", "out-for-delivery", "delivered"];

// Map steps to Font Awesome icons
const STEP_ICONS = {
  ordered: "fa-solid fa-cart-shopping",
  shipped: "fa-solid fa-box",
  "out-for-delivery": "fa-solid fa-truck",
  delivered: "fa-solid fa-check-circle",
};

// Capitalize and format status text
const formatStatus = (status) => {
  if (!status) return "Ordered";
  return status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, " ");
};

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("ordersHistory")) || [];
    if (savedOrders.length > 0) {
      setOrders(savedOrders);
    } else {
      const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));
      if (lastOrder) {
        lastOrder.status = "ordered"; // Force Ordered for now
        setOrders([lastOrder]);
      }
    }
  }, []);

  const handleInvoiceClick = (order) => {
    localStorage.setItem("lastOrder", JSON.stringify(order));
    navigate("/invoice");
  };

  const handleCancel = (orderId) => {
    alert(`Order ${orderId} cancelled!`);
    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId ? { ...o, status: "cancelled" } : o
      )
    );
  };

  const handleReturn = (orderId) => {
    alert(`Return request for Order ${orderId} submitted!`);
    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId ? { ...o, status: "returned" } : o
      )
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toString().includes(searchTerm) ||
      order.cart.some((it) =>
        it.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesFilter =
      filter === "all" || order.status?.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  if (orders.length === 0) {
    return (
      <>
        <Navbar />
        <main className="orders-page">
          <section className="empty-orders">
            <h2>No Orders Found</h2>
            <p>Looks like you haven’t placed any orders yet.</p>
            <button className="order-btn" onClick={() => navigate("/")}>
              🛍 Start Shopping
            </button>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="orders-page">
        <h1 className="orders-title">My Orders</h1>

        {/* Search + Filter */}
        <div className="order-controls">
          <input
            type="text"
            placeholder="🔍 Search by Order ID or Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Orders</option>
            <option value="ordered">Ordered</option>
            <option value="shipped">Shipped</option>
            <option value="out-for-delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="returned">Returned</option>
          </select>
        </div>

        {/* Orders */}
        <section className="orders-list">
          {filteredOrders.map((order) => {
            const safeStatus = "ordered"; // Force Ordered dynamically
            const currentIndex = 0; // First step active

            return (
              <div key={order.orderId} className="order-card">
                {/* Header */}
                <header className="order-header">
                  <div>
                    <div>
                      <strong>Order ID:</strong> {order.orderId}
                    </div>
                    <div>
                      <strong>Date:</strong>{" "}
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Status:</strong>{" "}
                      <span className={`status ${safeStatus}`}>
                        {formatStatus(safeStatus)}
                      </span>
                      <small className="status-msg">
                        {STATUS_MESSAGES[safeStatus] || ""}
                      </small>
                    </div>
                  </div>
                  <div className="order-total">
                    <strong>Total:</strong> {formatCurrency(order.grandTotal)}
                  </div>
                </header>

                {/* Timeline */}
                <div className="order-timeline">
                  {ORDER_STEPS.map((step, i) => {
                    let stepClass = "upcoming";
                    if (i < currentIndex) stepClass = "completed";
                    else if (i === currentIndex) stepClass = "active";

                    return (
                      <div key={step} className={`timeline-step ${stepClass}`}>
                        <div
                          className="circle"
                          style={{
                            background:
                              stepClass === "completed"
                                ? "#28a745"
                                : stepClass === "active"
                                ? "#ffb84d"
                                : "#ddd",
                            borderColor:
                              stepClass === "completed" ||
                              stepClass === "active"
                                ? stepClass === "active"
                                  ? "#ffb84d"
                                  : "#28a745"
                                : "#ccc",
                          }}
                        >
                          <i
                            className={STEP_ICONS[step]}
                            style={{
                              color: stepClass === "upcoming" ? "#888" : "#fff",
                            }}
                          ></i>
                        </div>
                        <span className="step-label">{formatStatus(step)}</span>
                        {i < ORDER_STEPS.length - 1 && (
                          <div
                            className="timeline-line"
                            style={{
                              background: i < currentIndex ? "#28a745" : "#ddd",
                            }}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Items */}
                <div className="order-items">
                  {(order.cart || []).map((it) => (
                    <div
                      key={it.id || it.sku || Math.random()}
                      className="order-item"
                    >
                      {it.images && it.images[0] ? (
                        <img
                          src={it.images[0]}
                          alt={it.name}
                          className="item-thumb"
                        />
                      ) : (
                        <div className="item-thumb placeholder" />
                      )}
                      <div className="item-info">
                        <div className="item-name">{it.name}</div>
                        {it.variant && (
                          <div className="item-variant">{it.variant}</div>
                        )}
                        <div className="item-qty">Qty: {it.qty}</div>
                        <div className="item-price">
                          {formatCurrency(it.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <footer className="order-actions-icons">
                  {/* View Details */}
                  <div
                    className="action-icon view"
                    onClick={() => navigate(`/orders/${order.orderId}`)}
                  >
                    <i className="fa-solid fa-eye"></i>
                    <span className="tooltip">View Details</span>
                  </div>

                  {/* Track Package */}
                  <div
                    className="action-icon track"
                    onClick={() => alert("Tracking info coming soon!")}
                  >
                    <i className="fa-solid fa-truck"></i>
                    <span className="tooltip">Track Package</span>
                  </div>

                  {/* Download Invoice */}
                  <div
                    className="action-icon invoice"
                    onClick={() => handleInvoiceClick(order)}
                  >
                    <i className="fa-solid fa-file-invoice"></i>
                    <span className="tooltip">Download Invoice</span>
                  </div>

                  {/* Cancel Order */}
                  {safeStatus === "ordered" && (
                    <div
                      className="action-icon cancel"
                      onClick={() => handleCancel(order.orderId)}
                    >
                      <i className="fa-solid fa-times-circle"></i>
                      <span className="tooltip">Cancel Order</span>
                    </div>
                  )}

                  {/* Return Order */}
                  {safeStatus === "delivered" && (
                    <>
                      <div
                        className="action-icon warning"
                        onClick={() => handleReturn(order.orderId)}
                      >
                        <i className="fa-solid fa-undo"></i>
                        <span className="tooltip">Return Order</span>
                      </div>

                      <div
                        className="action-icon review"
                        onClick={() => alert("Review feature coming soon!")}
                      >
                        <i className="fa-solid fa-star"></i>
                        <span className="tooltip">Write Review</span>
                      </div>
                    </>
                  )}
                </footer>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default MyOrdersPage;
