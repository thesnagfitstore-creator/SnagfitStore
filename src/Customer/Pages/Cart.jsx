import React from "react";
import Navbar from "../Components/Navigation/Navbar";
import { useCart } from "../Context/CartContext";
import "../Styles/Cart.css";

const Cart = () => {
    const { cart, removeFromCart, updateQty } = useCart();

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <>
            <Navbar />
            <section id="cart-page">
                <h2>Your Cart</h2>

                {cart.length === 0 ? (
                    <p className="empty-cart">Your cart is empty 🛒</p>
                ) : (
                    <div className="cart-container">
                        <div className="cart-items">
                            {cart.map((item) => (
                                <div className="cart-card" key={item.id}>
                                    <img src={item.images[0]} alt={item.name} />
                                    <div className="cart-info">
                                        <h4>{item.name}</h4>
                                        <p>${item.price}</p>
                                        <div className="qty-control">
                                            <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                                            <span>{item.qty}</span>
                                            <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            ❌ Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h3>Order Summary</h3>
                            <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
                            <button className="checkout-btn">Proceed to Checkout</button>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default Cart;
