import React from "react";
import heroImage from "../../assets/hero_img/hero.png";
import { FaStar, FaStarHalfAlt, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import products from "../../Data/product"; // ✅ Import products from data
// ✅ Correct import for react-tooltip v5+
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';


// ✅ Import Local Feature Images
import f1 from "../../assets/features/free_SHIP.png";
import f2 from "../../assets/features/HAPPY_CUSTOMER.png";
import f3 from "../../assets/features/order_confirm.png";
import f4 from "../../assets/features/PROMOTIONSD.png";
import f5 from "../../assets/features/SAVE_MONEY.png";
import f6 from "../../assets/features/SUPPORT.png";

const Home = () => {
    const features = [
        { img: f1, title: "Free Shipping", desc: "Get free shipping on orders above $50." },
        { img: f2, title: "Online Order", desc: "Place orders anytime with our 24/7 online store." },
        { img: f3, title: "Save Money", desc: "Enjoy discounts and special offers on all products." },
        { img: f4, title: "Promotions", desc: "Exclusive seasonal promotions for our customers." },
        { img: f5, title: "Happy Sell", desc: "We guarantee satisfaction on every purchase." },
        { img: f6, title: "24/7 Support", desc: "Our support team is always here to help you." },
    ];

    const getStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                ))}
                {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
            </>
        );
    };

    return (
        <>
            {/* Hero Section */}
            <section
                id="hero"
                className="bg-[#fff6f2] py-16 px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between"
            >
                <div className="lg:w-1/2">
                    <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
                        Snag Your Fit.
                        <br />
                        <span className="text-red-500">Wear Your Vibe.</span>
                    </h1>
                    <p className="mt-4 text-gray-700 text-lg">
                        Discover premium t-shirts that speak your style.
                        <br />
                        Quality fabric, bold designs, perfect fits.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="hero-btn bg-red-500 text-white font-semibold px-6 py-3 rounded-full shadow-md"
                        >
                            Shop Now
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="hero-btn border-2 border-red-500 text-red-500 font-semibold px-6 py-3 rounded-full hover:bg-red-50"
                        >
                            View Collection
                        </motion.button>
                    </div>
                </div>

                <div className="lg:w-1/2 mt-10 lg:mt-0 text-center lg:text-right">
                    <img
                        src={heroImage}
                        alt="Hero"
                        className="rounded-2xl shadow-lg max-w-full hero-img"
                    />
                </div>
            </section>

            <section id="feature" className="bg-[#fdf8f5] py-16 px-6 lg:px-20">
                <div className="feature-container flex justify-center gap-8 flex-wrap lg:flex-nowrap">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-box w-40 relative rounded-3xl p-6 text-center bg-white shadow-xl transition-all duration-500 group cursor-pointer overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.08 }}
                            onMouseMove={(e) => {
                                const card = e.currentTarget;
                                const rect = card.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                const centerX = rect.width / 2;
                                const centerY = rect.height / 2;
                                const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
                                const rotateY = ((x - centerX) / centerX) * 10;
                                card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                            }}
                            onMouseLeave={(e) => {
                                const card = e.currentTarget;
                                card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
                            }}
                        >
                            <img
                                src={feature.img}
                                alt={feature.title}
                                className="w-20 h-20 mx-auto mb-4 transition-transform duration-500 group-hover:scale-110"
                                data-tooltip-id={`tooltip-${index}`}
                                data-tooltip-content={feature.desc || feature.title}
                            />
                            <p className="font-bold text-gray-800 text-lg relative z-10">{feature.title}</p>
                            <Tooltip id={`tooltip-${index}`} place="top" />
                        </motion.div>
                    ))}
                </div>
            </section>



            {/* Featured Products Section */}
            <section id="product1" className="bg-[#fffaf5] py-16 px-6 lg:px-20">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                        Featured Products
                    </h2>
                    <p className="text-gray-500 italic">Summer Collection New Modern Design</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: item.id * 0.1 }}
                            className="product-card bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 p-5 flex flex-col justify-between relative group hover:-translate-y-2"
                        >
                            <img
                                src={item.images[0]}
                                alt={item.name}
                                className="rounded-xl w-full h-56 object-cover mb-4 transition-transform duration-300 hover:scale-105"
                            />
                            <div className="text-left w-full">
                                <span className="text-gray-500 font-semibold uppercase text-sm">{item.brand}</span>
                                <h5 className="font-bold text-lg text-gray-800 mb-1">{item.name}</h5>
                                <div className="flex items-center mb-2">{getStars(item.rating)}</div>
                                <h4 className="text-red-500 font-bold text-lg">${item.price}</h4>
                            </div>
                            <button
                                className="cart absolute bottom-5 right-5 border-2 border-red-500 text-red-500 p-3 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                                onClick={() => alert(`Added ${item.name} to cart!`)}
                            >
                                <FaShoppingCart size={18} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Home;
