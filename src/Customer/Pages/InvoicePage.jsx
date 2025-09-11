import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Navbar from "../Components/Navigation/Navbar";
import Footer from "../Components/Footer/Footer";
import "../Styles/InvoicePage.css";

const formatCurrency = (n) => `$${Number(n).toFixed(2)}`;

const InvoicePage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("lastOrder");
    if (saved) {
      setOrder(JSON.parse(saved));
    }
  }, []);

  if (!order) {
    return (
      <>
        <Navbar />
        <main className="invoice-page">
          <section className="invoice-card empty">
            <h2>No order found</h2>
            <p>
              We couldn't find your latest order. Go to My Orders to view past
              purchases.
            </p>
            <button
              className="my-orders-btn"
              onClick={() => navigate("/my-orders")}
            >
              📦 Go to My Orders
            </button>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const today = new Date();

  const downloadInvoice = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    // optional logo if base64 provided in order.storeLogoBase64
    let cursorY = 40;
    if (order.storeLogoBase64) {
      try {
        doc.addImage(order.storeLogoBase64, "PNG", 40, cursorY, 90, 40);
      } catch (e) {
        // if addImage fails, ignore
      }
    }

    doc.setFontSize(18);
    doc.text("Invoice", 380, 60, null, null, "center");

    doc.setFontSize(10);
    doc.text(`Order ID: ${order.orderId}`, 40, 110);
    doc.text(`Order Date: ${today.toLocaleDateString()}`, 40, 126);
    doc.text(`Payment: ${order.paymentMethod || "—"}`, 40, 142);
    if (order.status) doc.text(`Status: ${order.status}`, 40, 158);

    // Buyer & Shipping blocks
    const leftX = 40;
    const rightX = 320;
    let blockY = 185;
    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.text("Billing To", leftX, blockY);
    doc.text("Shipping To", rightX, blockY);
    doc.setFont(undefined, "normal");
    blockY += 12;

    const writeAddress = (addr, x, yStart) => {
      if (!addr) return yStart;
      let y = yStart;
      if (addr.name) {
        doc.text(addr.name, x, y);
        y += 12;
      }
      if (addr.address) {
        doc.text(addr.address, x, y);
        y += 12;
      }
      const cityline = `${addr.city || ""}${addr.city ? ", " : ""}${
        addr.state || ""
      }${addr.zip ? " - " + addr.zip : ""}`;
      if (cityline.trim()) {
        doc.text(cityline, x, y);
        y += 12;
      }
      if (addr.phone) {
        doc.text(`Phone: ${addr.phone}`, x, y);
        y += 12;
      }
      if (addr.email) {
        doc.text(`Email: ${addr.email}`, x, y);
        y += 12;
      }

      return y;
    };

    let yAfterLeft = writeAddress(
      order.billingAddress || order.deliveryAddress,
      leftX,
      blockY
    );
    let yAfterRight = writeAddress(order.deliveryAddress, rightX, blockY);
    const tableStartY = Math.max(yAfterLeft, yAfterRight) + 24;

    // Build table rows for jspdf-autotable
    const columns = [
      { header: "Item", dataKey: "item" },
      { header: "SKU", dataKey: "sku" },
      { header: "Price", dataKey: "price" },
      { header: "Qty", dataKey: "qty" },
      { header: "Line Total", dataKey: "line" },
    ];

    const rows = order.cart.map((it) => ({
      item: it.name,
      sku: it.sku || it.id || "—",
      price: `$${Number(it.price).toFixed(2)}`,
      qty: it.qty,
      line: `$${(Number(it.price) * Number(it.qty)).toFixed(2)}`,
    }));

    autoTable(doc, {
      startY: tableStartY,
      head: [columns.map((c) => c.header)],
      body: rows.map((r) => [r.item, r.sku, r.price, r.qty, r.line]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [51, 51, 51], textColor: 255 },
      columnStyles: {
        0: { cellWidth: 210 },
        1: { cellWidth: 70 },
        2: { cellWidth: 70 },
        3: { cellWidth: 50 },
        4: { cellWidth: 80 },
      },
      theme: "grid",
      margin: { left: 40, right: 40 },
    });

    // Totals summary below table
    const finalY = doc.lastAutoTable
      ? doc.lastAutoTable.finalY + 20
      : tableStartY + 20;
    const rightColX = 420;
    doc.setFont(undefined, "normal");
    doc.text(
      `Subtotal: ${formatCurrency(order.subtotal || 0)}`,
      rightColX,
      finalY
    );
    doc.text(
      `Shipping: ${
        order.shipping === 0 ? "FREE" : formatCurrency(order.shipping || 0)
      }`,
      rightColX,
      finalY + 14
    );
    doc.text(
      `Tax (${order.taxPercent || 0}%): ${formatCurrency(order.tax || 0)}`,
      rightColX,
      finalY + 28
    );
    doc.setFont(undefined, "bold");
    doc.text(
      `Grand Total: ${formatCurrency(order.grandTotal || 0)}`,
      rightColX,
      finalY + 46
    );

    // Footer small note
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.text("Thank you for shopping with us!", 40, 800);

    doc.save(`${order.orderId}_invoice.pdf`);
  };

  return (
    <>
      <Navbar />
      <main className="invoice-page">
        <section className="invoice-card">
          <header className="invoice-header">
            <div className="brand-left">
              {order.storeLogoUrl ? (
                <img
                  src={order.storeLogoUrl}
                  alt="Store logo"
                  className="store-logo"
                />
              ) : (
                <div className="store-placeholder">THE SNAGFIT STORE</div>
              )}
              <div className="store-meta">
                <div className="store-name">
                  {order.storeName || "The Snagfit Store"}
                </div>
                <div className="store-tag">seller@thesnagfitstore.com</div>
              </div>
            </div>

            <div className="invoice-meta">
              <h2>Invoice</h2>
              <div className="meta-row">
                <div>
                  <strong>Order ID:</strong> {order.orderId}
                </div>
                <div>
                  <strong>Date:</strong> {today.toLocaleDateString()}
                </div>
              </div>
              <div className="meta-row">
                <div>
                  <strong>Payment:</strong> {order.paymentMethod || "—"}
                </div>
                <div>
                  <strong>Status:</strong> {order.status || "Processing"}
                </div>
              </div>
            </div>
          </header>

          <section className="addresses">
            <div className="address-block">
              <h3>Billing</h3>
              <p className="name">
                {(order.billingAddress && order.billingAddress.name) || "—"}
              </p>
              <p>
                {(order.billingAddress && order.billingAddress.address) || "—"}
              </p>
              <p>
                {(order.billingAddress &&
                  `${order.billingAddress.city || ""}${
                    order.billingAddress.city ? ", " : ""
                  }${order.billingAddress.state || ""}`) ||
                  ""}{" "}
                {order.billingAddress && order.billingAddress.zip
                  ? ` - ${order.billingAddress.zip}`
                  : ""}
              </p>
              <p>
                {(order.billingAddress && order.billingAddress.phone) || ""}
              </p>
            </div>

            <div className="address-block">
              <h3>Shipping</h3>
              <p className="name">
                {(order.deliveryAddress && order.deliveryAddress.name) || "—"}
              </p>
              <p>
                {(order.deliveryAddress && order.deliveryAddress.address) ||
                  "—"}
              </p>
              <p>
                {(order.deliveryAddress &&
                  `${order.deliveryAddress.city || ""}${
                    order.deliveryAddress.city ? ", " : ""
                  }${order.deliveryAddress.state || ""}`) ||
                  ""}{" "}
                {order.deliveryAddress && order.deliveryAddress.zip
                  ? ` - ${order.deliveryAddress.zip}`
                  : ""}
              </p>
              <p>
                {(order.deliveryAddress && order.deliveryAddress.phone) || ""}
              </p>
            </div>

            <div className="address-block right">
              <h3>Order Summary</h3>
              <p>
                <strong>Items:</strong> {order.cart.length}
              </p>
              <p>
                <strong>Subtotal:</strong> {formatCurrency(order.subtotal || 0)}
              </p>
              <p>
                <strong>Shipping:</strong>{" "}
                {order.shipping === 0
                  ? "FREE"
                  : formatCurrency(order.shipping || 0)}
              </p>
              <p>
                <strong>Tax:</strong> {formatCurrency(order.tax || 0)}
              </p>
              <p className="grand-total">
                <strong>
                  Grand Total: {formatCurrency(order.grandTotal || 0)}
                </strong>
              </p>
            </div>
          </section>

          <section className="items-table-wrapper">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th className="col-item">Item</th>
                  <th className="col-sku">SKU</th>
                  <th className="col-price">Unit Price</th>
                  <th className="col-qty">Qty</th>
                  <th className="col-line">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cart.map((it) => (
                  <tr key={it.id || it.sku || Math.random()}>
                    <td className="item-cell">
                      <div className="item-meta">
                        {it.images && it.images[0] ? (
                          <img
                            src={it.images[0]}
                            alt={it.name}
                            className="thumb"
                          />
                        ) : (
                          <div className="thumb placeholder" />
                        )}
                        <div>
                          <div className="item-name">{it.name}</div>
                          {it.variant && (
                            <div className="item-variant">{it.variant}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{it.sku || it.id || "—"}</td>
                    <td>{formatCurrency(it.price)}</td>
                    <td>{it.qty}</td>
                    <td>{formatCurrency(Number(it.price) * Number(it.qty))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="bottom-actions">
            <div className="left-actions">
              <button className="download-btn" onClick={downloadInvoice}>
                📄 Download Invoice (PDF)
              </button>
              <button className="print-btn" onClick={() => window.print()}>
                🖨 Print
              </button>
            </div>
            <div className="right-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal || 0)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {order.shipping === 0
                    ? "FREE"
                    : formatCurrency(order.shipping || 0)}
                </span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>{formatCurrency(order.tax || 0)}</span>
              </div>
              <div className="summary-row grand">
                <span>Grand Total</span>
                <span>{formatCurrency(order.grandTotal || 0)}</span>
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default InvoicePage;
