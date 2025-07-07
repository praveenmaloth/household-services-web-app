import React from "react";
import "../styles/about.css";
import { Heart, Star, Handshake, Shield, UserCheck, Wrench, ShieldCheck } from "lucide-react";

const CoreValues = () => {
  return (
    <div className="core-values">
      <h2>Our Core Values</h2>
      <div className="values">
        <div className="value">
          <Heart color="#2563EB" size={40} />
          <h3>Trust</h3>
          <p>Building lasting relationships through transparency and reliability</p>
        </div>
        <div className="value">
          <Star color="#2563EB" size={40} />
          <h3>Excellence</h3>
          <p>Delivering exceptional service quality in every interaction</p>
        </div>
        <div className="value">
          <Handshake color="#2563EB" size={40} />
          <h3>Partnership</h3>
          <p>Creating mutual success for workers and customers</p>
        </div>
        <div className="value">
          <Shield color="#2563EB" size={40} />
          <h3>Security</h3>
          <p>Ensuring safe and protected service delivery</p>
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay">
          <h1>About HomeService</h1>
          <p>
            Transforming the way household services are delivered, one home at a time. We connect skilled professionals with homeowners to create perfect matches and exceptional experiences.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="our-story">
        <div className="story-text">
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Our Story</h1>
          </div>
          <p>
            Founded in 2024, HomeServe Pro emerged from a simple yet powerful idea:
            to revolutionize the home services industry by creating a platform that truly
            serves both service providers and homeowners.
          </p>
          <p>
            Today, we've grown into a trusted platform that connects thousands of skilled
            professionals with homeowners across the country. Our success is built on
            our commitment to quality, transparency, and exceptional service delivery.
          </p>
          <div className="stats-container">
            <div className="stats-box">
              <p>15,000+</p>
              <p>Active Professionals</p>
            </div>
            <div className="stats-box">
              <p>50,000+</p>
              <p>Completed Jobs</p>
            </div>
          </div>
        </div>
        <img src="/images/graph.png" alt="Growth Chart" className="story-image" />
      </div>

      {/* How It Works */}
      <div className="how-it-works-container">
        <h2 className="section-title">How It Works</h2>
        <div className="features-container">
          <div className="feature">
            <UserCheck color="#2563EB" size={40} />
            <h3>For Customers</h3>
            <ul>
              <li><span className="tick-mark">&#10004;</span> Easy booking process</li>
              <li><span className="tick-mark">&#10004;</span> Verified professionals</li>
              <li><span className="tick-mark">&#10004;</span> Secure payments</li>
            </ul>
          </div>
          <div className="feature">
            <Wrench color="#2563EB" size={40} />
            <h3>For Workers</h3>
            <ul>
              <li><span className="tick-mark">&#10004;</span> Flexible schedule</li>
              <li><span className="tick-mark">&#10004;</span> Job acceptance control</li>
              <li><span className="tick-mark">&#10004;</span> Professional growth</li>
            </ul>
          </div>
          <div className="feature">
            <ShieldCheck color="#2563EB" size={40} />
            <h3>Platform Security</h3>
            <ul>
              <li><span className="tick-mark">&#10004;</span> Background checks</li>
              <li><span className="tick-mark">&#10004;</span> Secure transactions</li>
              <li><span className="tick-mark">&#10004;</span> 24/7 support</li>
            </ul>
          </div>
        </div>
      </div>
   

    {/* Core Values Section */}
    <CoreValues />
    </div>
  );
};

export default AboutUs;