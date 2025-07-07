import React, { useState, useEffect } from "react";
import { GiBroom, GiPaintBrush } from "react-icons/gi"; 
import { MdPlumbing, MdOutlineCarpenter } from "react-icons/md"; 
import { FiZap } from "react-icons/fi"; 
import { FaBug } from "react-icons/fa"; 
import { TbAirConditioning } from "react-icons/tb"; 


import Login from "./Login"; 
import Modal from "./Modal"; 
import Registration from "./Registration"; 

import "../styles/home.css";
import "./About"
import "./Contact"
import "./Services"
import "./Contact"
import "./Reviews"

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  const [showLogin, setShowLogin] = useState(false); 
  const [showRegister, setShowRegister] = useState(false);
  const closeModal = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const images = ['/images/back.webp', '/images/bg.webp', '/images/bacground.jpg'];

  const serviceDetails = [
    { name: 'Cleaning', image: '/images/clean.jpeg', description: 'Professional home and office cleaning services.', icon: <GiBroom size={24} color="green" /> },
    { name: 'Plumbing', image: '/images/plumb.jpeg', description: 'Expert solutions for all plumbing needs.', icon: <MdPlumbing size={24} color="blue" /> },
    { name: 'Electrical', image: '/images/elec.jpeg', description: 'Certified electricians for safe and quick fixes.', icon: <FiZap size={24} color="orange" /> },
    { name: 'Painting', image: '/images/paint.jpeg', description: 'Transform your space with professional painting.', icon: <GiPaintBrush size={24} color="purple" /> },
    { name: 'AC', image: '/images/ac.webp', description: 'Professional AC Cleaning and Servicing services.', icon: <TbAirConditioning size={24} color="skyblue" /> },
    { name: 'Pest Control', image: '/images/pest.jpg', description: 'Safe and effective pest control solutions.', icon: <FaBug size={24} color="red" /> },
    { name: 'Carpentry', image: '/images/car.jpeg', description: 'Expert carpentry and woodwork solutions.', icon: <MdOutlineCarpenter size={24} color="brown" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = serviceDetails.filter(service =>
      service.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  

  return (
    <div>
      {/* Slideshow Section */}
      <div className="home-container">
        <img src={images[currentImageIndex]} alt="Background Slideshow" className="home-image" />
        <div className="overlay-content">
          <h1 className="home-title">Welcome to Household Services</h1>
          <p className="home-description">Your one-stop solution for all home maintenance services. Book trusted home services today and experience top-notch convenience and quality.</p>

          {/* Search Bar */}
          <div className="search-overlay">
            <input type="text" placeholder="Search for a service..." value={searchTerm} onChange={handleSearchChange} className="search-input" />
            {searchTerm && filteredServices.length > 0 && (
              <ul className="dropdown">
                {filteredServices.map((service, index) => (
                  <li key={index} className="dropdown-item">{service.icon} {service.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Buttons */}
          <div className="button-group">
          <button className="home-button" onClick={() => setShowLogin(true)}>
              Login
            </button>
          <button className="home-button" onClick={() => setShowRegister(true)}>
          Register
        </button>
          </div>
        </div>
      </div>

      
      {/* Login Modal Popup */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-content">
          <button className="close-button" onClick={closeModal}>×</button>
            <Login /> {/* Your existing login form */}
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showRegister && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>
            <Registration />
          </div>
        </div>
      )}

      

    

      {/* Our Services Section */}
      <div className="our-services-section">
        <h2 className="services-title">Our Services</h2>
        <div className="services-list">
          {serviceDetails.map((service, index) => (
            <div key={index} className="service-card">
              <img src={service.image} alt={service.name} className="service-image" />
              <h3 className="service-name">{service.icon} {service.name}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-us-section">
        <h2 className="why-title">Why Choose Us</h2>
        <p className="why-subtitle">Experience the best in home services with our platform</p>
        <div className="why-list">
          <div className="why-item"><div className="why-icon">🛡️</div><h3>Trusted Professionals</h3><p>All providers are verified and background-checked.</p></div>
          <div className="why-item"><div className="why-icon">⏱️</div><h3>Quick Response</h3><p>Get connected with professionals within minutes.</p></div>
          <div className="why-item"><div className="why-icon">⭐</div><h3>Quality Guaranteed</h3><p>100% satisfaction guaranteed.</p></div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2 className="testimonials-title">What Our Customers Say</h2>
        <p className="testimonials-subtitle">Read testimonials from our satisfied customers</p>
        <div className="testimonials-list">
          {[
            { name: "Praveen", role: "Homeowner", image: "/images/prav.jpg", text: "Exceptional service! The cleaning team was thorough and professional. My house has never looked better." },
            { name: "Jwala Sai", role: "Property Manager", image: "/images/jwala.jpg", text: "Reliable and efficient plumbing service. They solved our issues quickly and professionally." },
            { name: "Abhinav", role: "Interior Designer", image: "/images/abh.jpg", text: "The painting team did an amazing job. Their attention to detail is impressive." },
            { name: "Hemanth", role: "Business Owner", image: "/images/hem.jpg", text: "The electrician was quick to respond and fixed the wiring issue efficiently. Highly recommended for any electrical work!" },
          ].map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-avatar" />
                <div><h3>{testimonial.name}</h3><p>{testimonial.role}</p></div>
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ready to Get Started Section */}
      <div className="get-started-section">
        <h2 className="get-started-title">Ready to Get Started?</h2>
        <p className="get-started-subtitle">Join thousands of satisfied customers who trust us with their home service needs.</p>
        {/* <button className="get-started-button">Book a Service Now</button> */}
        <a className="get-started-button" href="/services">
  Book a Service Now
</a>

      </div>

      {/* Footer Section */}
<div className="footer-section">
  <div className="footer-container">
    {/* Logo and About */}
    <div className="footer-column">
      <h3 className="footer-title">HomeServices</h3>
      <p>Your trusted partner for professional home services</p>
    </div>

    {/* Quick Links */}
    <div className="footer-column">
      <h4 className="footer-subtitle">Quick Links</h4>
      <ul>
        <li><a href="./About">About Us</a></li>
        <li><a href="./Services">Services</a></li>
        <li><a href="./Reviews">Reviews</a></li>
        <li><a href="./Contact">Contact</a></li>
      </ul>
    </div>

    {/* Services */}
    <div className="footer-column">
      <h4 className="footer-subtitle">Services</h4>
      <ul>
        <li><a href="#">House Cleaning</a></li>
        <li><a href="#">Plumbing</a></li>
        <li><a href="#">Electrical</a></li>
        <li><a href="#">Gardening</a></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div className="footer-column">
      <h4 className="footer-subtitle">Contact Us</h4>
      <ul>
        <li>📞 +91 7075101850</li>
        <li>📧 jwalasai7077@gmail.com</li>
        <li>📍 Reddy Nagar , 7th line , Vinukonda</li>
      </ul>
    </div>
  </div>

  {/* Copyright and Social Media */}
  <div className="footer-bottom">
    <p></p>
    <div className="footer-social-icons">
      <a href="#"><i className="fab fa-facebook-f"></i></a>
      <a href="#"><i className="fab fa-twitter"></i></a>
      <a href="#"><i className="fab fa-instagram"></i></a>
      <a href="#"><i className="fab fa-linkedin-in"></i></a>
    </div>
  </div>
</div>

    </div>
  );
};

export default Home;
