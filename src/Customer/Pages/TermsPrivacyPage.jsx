import React from "react";
import Navbar from "../Components/Navigation/Navbar";
import "../Styles/TermsPrivacyPage.css";

const TermsPrivacyPage = () => {
  return (
    <>
      <Navbar />
      <main className="terms-page">
        <h1 className="title">Terms & Conditions & Privacy Policy</h1>
        <p className="subtitle">
          Please read these Terms and our Privacy Policy carefully before using
          SNAGFIT.
        </p>

        {/* Terms Section */}
        <section className="policy-section">
          <h2>Terms & Conditions</h2>
          <ul>
            <li>
              By accessing or purchasing from <strong>SNAGFIT</strong>, you
              agree to our policies.
            </li>
            <li>
              All product details, pricing, and availability are subject to
              change without notice.
            </li>
            <li>
              Orders cannot be cancelled once placed. Please refer to our{" "}
              <a href="/returns-refunds" className="link">
                Returns & Refunds Policy
              </a>
              .
            </li>
            <li>
              Payments must be made securely via approved payment gateways. We
              do not store card details.
            </li>
            <li>
              SNAGFIT is not liable for delays caused by courier or unforeseen
              events.
            </li>
            <li>
              Unauthorized use of our logo, images, or content is strictly
              prohibited.
            </li>
          </ul>
        </section>

        {/* Privacy Section */}
        <section className="policy-section">
          <h2>Privacy Policy</h2>
          <ul>
            <li>
              We collect personal details such as name, email, phone, and
              shipping address for order processing.
            </li>
            <li>
              Your payment information is handled securely by trusted
              third-party gateways. We do not store sensitive payment details.
            </li>
            <li>
              We may use your contact info to share order updates, promotional
              offers, or policy changes.
            </li>
            <li>
              Your data will never be sold or shared with unauthorized third
              parties.
            </li>
            <li>
              We use cookies to improve website performance and personalize your
              experience.
            </li>
            <li>
              You can request deletion of your personal data by contacting{" "}
              <a href="mailto:support@snagfit.com" className="link">
                support@snagfit.com
              </a>
              .
            </li>
          </ul>
        </section>

        {/* Customer Support */}
        <section className="policy-section">
          <h2>Customer Support</h2>
          <p>
            For any queries regarding our Terms or Privacy Policy, please reach
            us at: <br />
            <strong>Email:</strong>{" "}
            <a href="mailto:support@snagfit.com" className="link">
              support@snagfit.com
            </a>{" "}
            | <strong>Phone:</strong>{" "}
            <a href="tel:+917351040985" className="link">
              +91 7351040985
            </a>
          </p>
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

export default TermsPrivacyPage;
