import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    console.log("Sending login request with:", email, password); // Debugging
  
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
  
      console.log("Response from server:", response.data); // Debugging
  
      if (response.data.userId) {
        localStorage.setItem("userId", response.data.userId);
        setMessage("Login successful!"); // Set success message
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      setMessage("Error logging in. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="btn">Login</button>
      </form>
      {message && <p className="message">{message}</p>} 
      <p className="redirect">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
