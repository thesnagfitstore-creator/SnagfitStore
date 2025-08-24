/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#441515",      // Dark maroon
                secondary: "#f7f3e3",    // Beige background
                accent: "#E53935",       // Red for cart badge & underline
            },
            fontFamily: {
                brand: ["Celandine", "cursive", "serif"],
                body: ["Inter", "sans-serif"],
            },
            boxShadow: {
                header: "0 3px 18px rgba(116, 28, 28, 0.10)",
            },
        }
    },
    plugins: [],
};
