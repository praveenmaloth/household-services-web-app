import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";

const Registration = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", { name, email, password });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        { name, email, password },
        { withCredentials: true }
      );

      console.log("Server Response:", response.data);

      if (response.status === 200) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          closeModal(); // Close the modal after successful registration
        }, 1500);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Axios Error:", error.response || error.message);
      setMessage(error.response?.data?.message || "Error registering. Try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>×</button>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Register</button>
        </form>
        {message && <p className="message">{message}</p>}
        {/* <p className="redirect">
          Already have an account? <Link to="/">Login</Link>
        </p> */}
      </div>
    </div>
  );
};

export default Registration;
