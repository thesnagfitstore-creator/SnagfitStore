import React from "react";
import Navbar from "../Components/Navigation/Navbar";
import "../Styles/ReturnsRefunds.css";

const ReturnsRefundsPage = () => {
  return (
    <>
      <Navbar />
      <main className="returns-page">
        <h1 className="title">Returns & Refunds Policy</h1>
        <p className="subtitle">
          We value your trust. Please read our return and refund policy
          carefully before placing an order.
        </p>

        {/* Store Policy Section */}
        <section className="policy-section">
          <h2>Store Policy</h2>
          <p>
            <strong>No Cancellation / No Exchange / No Refund</strong>
          </p>
          <p>
            Return is accepted <strong>ONLY</strong> if:
          </p>
          <ul>
            <li>We sent the wrong item, size, or a defective piece</li>
            <li>
              You share a <strong>complete unboxing video</strong> (without
              cuts)
            </li>
            <li>
              The item is shipped back within{" "}
              <strong>2–3 days of delivery</strong>
            </li>
          </ul>
          <p className="highlight">
            Refunds will be initiated only after we receive and inspect the
            returned item.
          </p>
        </section>

        {/* Additional Guidelines */}
        <section className="policy-section">
          <h2>Return Eligibility</h2>
          <ul>
            <li>
              Items must be unused, unworn, and with all original tags attached.
            </li>
            <li>
              Products bought during SALE or CLEARANCE are not eligible for
              return.
            </li>
            <li>
              Innerwear and accessories cannot be returned due to hygiene
              reasons.
            </li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Return Shipping</h2>
          <p>
            If the return is due to a defective/wrong item,{" "}
            <strong>SNAGFIT</strong> will cover the shipping charges. For all
            other approved returns, customers are responsible for return
            shipping.
          </p>
        </section>

        <section className="policy-section">
          <h2>Refund Timeline & Method</h2>
          <ul>
            <li>
              Refunds are processed within <strong>5–7 working days</strong>{" "}
              after inspection.
            </li>
            <li>
              Refund will be credited to the{" "}
              <strong>original payment method</strong> (Bank/UPI/Card).
            </li>
            <li>
              You’ll receive a confirmation email/WhatsApp once your refund is
              processed.
            </li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Damaged in Transit</h2>
          <p>
            If your package arrives damaged, please contact us within{" "}
            <strong>24 hours</strong> with photos and a complete unboxing video.
          </p>
        </section>

        {/* FAQ */}
        <section className="policy-section">
          <h2>FAQs</h2>
          <div className="faq">
            <h4>❓ Can I cancel my order after placing it?</h4>
            <p>
              Unfortunately, cancellations are not allowed once the order is
              placed.
            </p>
          </div>
          <div className="faq">
            <h4>❓ Can I return if the size doesn’t fit?</h4>
            <p>
              Returns are only accepted if the wrong size was sent by SNAGFIT.
            </p>
          </div>
          <div className="faq">
            <h4>❓ How will I know when my refund is processed?</h4>
            <p>
              You’ll be notified via Email/WhatsApp once your refund is approved
              and processed.
            </p>
          </div>
        </section>

        {/* Back Button */}
        <div className="back-btn-container">
          <a href="/" className="back-btn">
            ← Back to Shop
          </a>
        </div>
      </main>
    </>
  );
};

export default ReturnsRefundsPage;
