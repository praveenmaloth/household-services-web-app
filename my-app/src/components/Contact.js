import React from "react";
import "./../styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>Get in Touch</h2>
        <p>We'd love to hear from you. Our team is always here to help and answer any questions you may have.</p>
      </div>
      
      <div className="contact-content">
        {/* Contact Form */}
        <div className="contact-form">
          <h3>Send us a Message</h3>
          <form>
            <label>Name *</label>
            <input type="text" placeholder="Enter your name" required />

            <label>Email *</label>
            <input type="email" placeholder="Enter your email" required />

            <label>Phone (Optional)</label>
            <input type="tel" placeholder="Enter your phone number" />

            <label>Subject *</label>
            <input type="text" placeholder="Enter subject" required />

            <label>Message *</label>
            <textarea placeholder="Enter your message" required></textarea>

            <button type="submit" className="send-button">Send Message</button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p><strong>📍 Office Address</strong><br></br><br />Reddy Nagar , 7th line<br />Vinukonda , 522647</p><br></br>
          
          <p><strong>📞 Phone</strong><br></br><br />+91 7075101850</p><br></br>

          <p><strong>📧 Email</strong><br></br><br />jwalasai7077@gmail.com</p><br></br>

          <p><strong>⏳ Business Hours</strong><br></br><br />
            Monday - Friday: 9:00 AM - 6:00 PM<br />
            Saturday: 10:00 AM - 4:00 PM<br />
            Sunday: Based on booking Request
          </p>

          {/* Social Links */}
          {/* <div className="social-links">
            <h3>Follow Us</h3>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
