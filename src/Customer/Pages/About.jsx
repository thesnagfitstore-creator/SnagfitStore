import React from "react";
import Navbar from "../Components/Navigation/Navbar";
import "../Styles/About.css";

const teamMembers = [
    {
        img: "https://randomuser.me/api/portraits/men/2.jpg",
        name: "Rohan Singh",
        role: "Founder & CEO",
    },
    {
        img: "https://randomuser.me/api/portraits/women/3.jpg",
        name: "Nisha Patel",
        role: "Lead Designer",
    },
    {
        img: "https://randomuser.me/api/portraits/men/4.jpg",
        name: "Arjun Verma",
        role: "Community Manager",
    },
    {
        img: "https://randomuser.me/api/portraits/women/5.jpg",
        name: "Priya Sharma",
        role: "Support Lead",
    },
];

const About = () => (
    <>
        <Navbar />
        <div className="about-bg">
            <div className="about-centered">
                {/* Mission */}
                <section className="brand-mission">
                    <h2>
                        <i className="fas fa-bullseye me-2 mission-icon"></i>Our Mission
                    </h2>
                    <p>
                        At <b>THE SNAGFIT STORE</b>, we believe that clothing is not just a basic need—it’s a canvas for confidence, authenticity, and happiness. Our mission is to bring trendsetting, high-quality, and affordable styles straight to your doorstep.
                    </p>
                    <p>
                        From bold streetwear to essential basics, we’re here to help you express YOU—fearlessly and fashionably.
                    </p>
                </section>

                {/* Core Values */}
                <section className="brand-values">
                    <h2>
                        <i className="fas fa-heart me-2 text-danger"></i>Our Core Values
                    </h2>
                    <ul>
                        <li><i className="fas fa-check-circle"></i> Inclusivity & Body Positivity</li>
                        <li><i className="fas fa-check-circle"></i> Everyday Comfort Meets Street Style</li>
                        <li><i className="fas fa-check-circle"></i> Eco-Conscious Choices</li>
                        <li><i className="fas fa-check-circle"></i> Fast, Reliable Customer Service</li>
                        <li><i className="fas fa-check-circle"></i> Honest Prices, No Hidden Tricks</li>
                    </ul>
                </section>

                {/* Why Shop With Us */}
                <section className="why-choose">
                    <h2>
                        <i className="fas fa-star me-2 text-danger"></i>Why Shop With Us?
                    </h2>
                    <div className="why-grid">
                        <div className="icon-box">
                            <i className="fas fa-truck-fast"></i>
                            <div className="fw-bold">Fast & Free Shipping</div>
                            <p>We deliver quickly, no matter where you are. Orders above $50 ship free!</p>
                        </div>
                        <div className="icon-box">
                            <i className="fas fa-recycle"></i>
                            <div className="fw-bold">Sustainable Fashion</div>
                            <p>Wear the future: eco-friendly fabrics and responsible sourcing.</p>
                        </div>
                        <div className="icon-box">
                            <i className="fas fa-users"></i>
                            <div className="fw-bold">Community First</div>
                            <p>Your voice matters. We value feedback and build collections with your style in mind.</p>
                        </div>
                    </div>
                </section>

                {/* Meet Our Team */}
                <section className="team-section">
                    <h2>
                        <i className="fas fa-users me-2 text-danger"></i>Meet Our Team
                    </h2>
                    <div className="team-grid">
                        {teamMembers.map((member, i) => (
                            <div key={i} className="team-member">
                                <img src={member.img} alt={member.name} />
                                <h6>{member.name}</h6>
                                <span>{member.role}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="about-cta">
                    <h4>Ready to discover your new favorite outfit?</h4>
                    <p>Start shopping and join the SnagFit fam today.</p>
                    <a href="/shop" className="btn">Shop Now</a>
                </section>
            </div>
        </div>
    </>
);

export default About;
