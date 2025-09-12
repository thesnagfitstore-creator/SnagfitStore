import React from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
// import paymentImg from "../../assets/payments.png";

const Footer = () => {
  return (
    <footer className="bg-[#f7f3e3] text-[#441515] pt-10 pb-6 font-serif">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-4">SNAGFIT</h3>
            <h5 className="text-lg font-semibold mb-3">Contact</h5>
            <p className="mb-2">
              <strong>Address:</strong>{" "}
              <a
                href="https://www.google.com/maps/search/Near+Jain+Mandir,+ghaziabad,+India"
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-600"
              >
                Near Jain Mandir, Ghaziabad, Uttar Pradesh, India
              </a>
            </p>
            <p className="mb-2">
              <strong>Phone:</strong>{" "}
              <a href="tel:+917351040985" className="hover:text-red-600">
                +91 7351040985
              </a>
            </p>
            <p className="mb-4">
              <strong>Hours:</strong> 24/7 Support
            </p>

            <h5 className="text-lg font-semibold mb-2">Follow Us</h5>
            <div className="flex space-x-4 text-xl">
              <a
                href="https://www.instagram.com/thesnagfit?igsh=eG1peWpsdjg3cDN1"
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-600"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-600"
              >
                <FaTwitter />
              </a>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-600"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Column 2: About */}
          <div>
            <h5 className="text-lg font-semibold mb-3 uppercase">About</h5>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-red-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="/delivery" className="hover:text-red-600">
                  Delivery Information
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-red-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-red-600">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/returns-refunds" className="hover:text-red-600">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-red-600">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: My Account */}
          <div>
            <h5 className="text-lg font-semibold mb-3 uppercase">My Account</h5>
            <ul className="space-y-2">
              <li>
                <a href="/login" className="hover:text-red-600">
                  Sign In
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-red-600">
                  View Cart
                </a>
              </li>
              <li>
                <a href="/wishlist" className="hover:text-red-600">
                  My Wishlist
                </a>
              </li>
              <li>
                <a href="/track" className="hover:text-red-600">
                  Track My Order
                </a>
              </li>
              <li>
                <a href="/help" className="hover:text-red-600">
                  Help
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment */}
          {/* <div>
                        <h5 className="text-lg font-semibold mb-3 uppercase">
                            Payment Gateways
                        </h5>
                        <img
                            src={paymentImg}
                            alt="Payment Methods"
                            className="mt-3 max-w-[180px]"
                        />
                    </div> */}
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-300 mt-6 pt-4 text-sm text-gray-700">
          © 2025 THE SNAGFIT STORE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
