// src/data/products.js
import p1 from "../assets/products_img/p1.png";
import p2 from "../assets/products_img/p2.png";
import p3 from "../assets/products_img/p3.png";
import p4 from "../assets/products_img/p4.png";
import p5 from "../assets/products_img/p5.png";
import p6 from "../assets/products_img/p6.png";
import p7 from "../assets/products_img/p7.png";
import p8 from "../assets/products_img/p8.png";

export const products = [
    {
        id: 1,
        brand: "Adidas",
        name: "Astronaut T-Shirt",
        category: "mens",
        images: [p1, p1, p1], // you can add different views here
        price: 78,
        rating: 4.5,
        size: ["XS", "S", "M", "L", "XL"],
        discount: 20,
        inStock: true,
        description:
            "Soft cotton tee with astronaut graphic. Breathable, regular fit — perfect for layering.",
        reviews: [
            { id: 1, name: "Alex", rating: 5, comment: "Great quality!" },
            { id: 2, name: "Maya", rating: 4, comment: "Nice print and fit." },
        ],
    },
    {
        id: 2,
        brand: "Nike",
        name: "Vintage Print T-Shirt",
        category: "mens",
        images: [p2, p2, p2],
        price: 65,
        rating: 4,
        size: ["XS", "S", "M", "L"],
        discount: 10,
        inStock: true,
        description: "Soft cotton tee with vintage wash and printed logo.",
        reviews: [{ id: 1, name: "Sam", rating: 4, comment: "Comfortable." }],
    },
    // ... include the rest similarly (3..8)
    {
        id: 3,
        brand: "Zara",
        name: "Graphic Oversized T-Shirt",
        category: "mens",
        images: [p3],
        price: 72,
        rating: 3.5,
        size: ["M", "L", "XL"],
        discount: 30,
        inStock: false,
        description: "Oversized relaxed tee with bold graphic.",
        reviews: [],
    },
    {
        id: 4,
        brand: "H&M",
        name: "Minimalist Cotton T-Shirt",
        category: "mens",
        images: [p4],
        price: 50,
        rating: 3,
        size: ["S", "M", "L"],
        discount: 15,
        inStock: true,
        description: "Minimal design, soft cotton",
        reviews: [],
    },
    {
        id: 5,
        brand: "Puma",
        name: "Casual Hoodie",
        category: "mens",
        images: [p5],
        price: 90,
        rating: 4.5,
        size: ["M", "L", "XL"],
        discount: 25,
        inStock: true,
        description: "Cozy everyday hoodie.",
        reviews: [],
    },
    {
        id: 6,
        brand: "Reebok",
        name: "Sports Jacket",
        category: "mens",
        images: [p6],
        price: 110,
        rating: 4,
        size: ["L", "XL"],
        discount: 20,
        inStock: true,
        description: "Lightweight sports jacket.",
        reviews: [],
    },
    {
        id: 7,
        brand: "Lacoste",
        name: "Slim Fit Polo",
        category: "mens",
        images: [p7],
        price: 85,
        rating: 3.5,
        size: ["S", "M", "L"],
        discount: 10,
        inStock: true,
        description: "Classic slim polo.",
        reviews: [],
    },
    {
        id: 8,
        brand: "Levi's",
        name: "Denim Jacket",
        category: "mens",
        images: [p8],
        price: 120,
        rating: 4,
        size: ["M", "L", "XL"],
        discount: 30,
        inStock: false,
        description: "True-blue denim jacket.",
        reviews: [],
    },
];

export default products;
