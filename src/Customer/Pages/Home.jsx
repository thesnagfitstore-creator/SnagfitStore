import React from "react";
import heroImage from "../../assets/hero_img/hero.png";
import { FaStar, FaStarHalfAlt, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

// ✅ Import Local Feature Images
import f1 from "../../assets/features/free_SHIP.png";
import f2 from "../../assets/features/HAPPY_CUSTOMER.png";
import f3 from "../../assets/features/order_confirm.png";
import f4 from "../../assets/features/PROMOTIONSD.png";
import f5 from "../../assets/features/SAVE_MONEY.png";
import f6 from "../../assets/features/SUPPORT.png";

// ✅ Import Product Images
import p1 from "../../assets/products_img/p1.png";
import p2 from "../../assets/products_img/p2.png";
import p3 from "../../assets/products_img/p3.png";
import p4 from "../../assets/products_img/p4.png";
import p5 from "../../assets/products_img/p5.png";
import p6 from "../../assets/products_img/p6.png";
import p7 from "../../assets/products_img/p7.png";
import p8 from "../../assets/products_img/p8.png";

const Home = () => {
    const features = [
        { img: f1, title: "Free Shipping" },
        { img: f2, title: "Online Order" },
        { img: f3, title: "Save Money" },
        { img: f4, title: "Promotions" },
        { img: f5, title: "Happy Sell" },
        { img: f6, title: "24/7 Support" },
    ];

    const products = [
        { img: p1, brand: "ADIDAS", name: "Astronaut T-Shirt", price: "$78", rating: 4.5 },
        { img: p2, brand: "NIKE", name: "Vintage Print T-Shirt", price: "$65", rating: 4 },
        { img: p3, brand: "ZARA", name: "Graphic Oversized T-Shirt", price: "$72", rating: 4 },
        { img: p4, brand: "H&M", name: "Minimalist Cotton T-Shirt", price: "$50", rating: 3.5 },
        { img: p5, brand: "PUMA", name: "Casual Hoodie", price: "$90", rating: 4.5 },
        { img: p6, brand: "REEBOK", name: "Sports Jacket", price: "$110", rating: 4 },
        { img: p7, brand: "LACOSTE", name: "Slim Fit Polo", price: "$85", rating: 3 },
        { img: p8, brand: "LEVI'S", name: "Denim Jacket", price: "$120", rating: 3.5 },
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
            {/* ✅ Hero Section */}
            <section className="bg-[#fff6f2] py-16 px-6 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                            Snag Your Fit.
                            <br />
                            <span className="text-red-500">Wear Your Vibe.</span>
                        </h1>
                        <p className="mt-6 text-gray-700 text-lg">
                            Discover premium t-shirts that speak your style.
                            <br />
                            Quality fabric, bold designs, perfect fits.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <button className="bg-red-500 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-red-600 transition">
                                Shop Now
                            </button>
                            <button className="border-2 border-red-500 text-red-500 font-semibold px-6 py-3 rounded-full hover:bg-red-50 transition">
                                View Collection
                            </button>
                        </div>
                    </div>
                    <div className="text-center lg:text-right">
                        <img src={heroImage} alt="Hero" className="rounded-2xl shadow-lg max-w-full" />
                    </div>
                </div>
            </section>

            {/* ✅ Features Section */}
            <section className="bg-[#fdf8f5] py-16 px-6 lg:px-20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.08 }}
                            className="relative rounded-3xl p-6 text-center bg-white shadow-xl hover:shadow-2xl 
                         backdrop-blur-lg border border-gray-100 transition-all duration-500
                         group cursor-pointer overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 opacity-0 group-hover:opacity-10 transition duration-500"></div>
                            <img
                                src={feature.img}
                                alt={feature.title}
                                className="w-20 h-20 mx-auto mb-4 transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* ✅ Text in Box with Shadow */}
                            <p className="font-bold text-gray-800 text-lg relative z-10 bg-white shadow-md px-3 py-2 rounded-lg inline-block">
                                {feature.title}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ✅ Featured Products Section */}
            <section className="bg-[#fffaf5] py-16 px-6 lg:px-20">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Featured Products</h2>
                    <p className="text-gray-500 italic">Summer Collection New Modern Design</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500
                         p-5 flex flex-col justify-between relative group hover:-translate-y-2"
                        >
                            <img
                                src={item.img}
                                alt={item.name}
                                className="rounded-xl w-full h-56 object-cover mb-4 transition-transform duration-300 hover:scale-105"
                            />
                            <div className="text-left w-full">
                                <span className="text-gray-500 font-semibold uppercase text-sm">{item.brand}</span>
                                <h5 className="font-bold text-lg text-gray-800 mb-1">{item.name}</h5>
                                <div className="flex items-center mb-2">{getStars(item.rating)}</div>
                                <h4 className="text-red-500 font-bold text-lg">{item.price}</h4>
                            </div>
                            {/* ✅ Add to Cart Button at Bottom Right */}
                            <button
                                className="absolute bottom-5 right-5 border-2 border-red-500 text-red-500 p-3 rounded-full 
                                hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
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
