import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography, Link} from "@mui/material";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import "../styles/servicelogin.css";
import "./ProvideService";

const serviceOptions = ["Cleaning", "AC Repair", "Electrician", "Plumbing", "Carpentry", "Painting", "Pest Control", "Home Security"];

const ProviderLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/provider/login", credentials, { withCredentials: true });
      if (response.data.success) {
        localStorage.setItem("providerId", response.data.providerId);
        navigate("/provider-dashboard");
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in.");
    }
  };

  return (
    <Container className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img src="/images/logo.webp" alt="HomeServices Logo" className="logo" />
          <Typography variant="h5">HomeServices Provider Portal</Typography>
        </div>
        <Typography variant="body1" className="welcome-message">
          Please sign in to your provider account to manage your services and bookings.
        </Typography>
        
        <TextField fullWidth label="Email Address" name="email" value={credentials.email} onChange={handleChange} variant="outlined" margin="normal" InputProps={{ startAdornment: <AiOutlineMail size={20} /> }} />
        <TextField fullWidth label="Password" name="password" type="password" value={credentials.password} onChange={handleChange} variant="outlined" margin="normal" InputProps={{ startAdornment: <AiOutlineLock size={20} /> }} />
        
        {/* <div className="login-options">
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <Link href="#" className="forgot-password">Forgot password?</Link>
        </div> */}
        
        <Button variant="contained" color="primary" fullWidth className="login-btn" onClick={handleLogin}>Sign In</Button>
        
        <Typography variant="body2" className="register-text">
          Don’t have an account? <Link href="/provide-service">Register as a Provider</Link>
        </Typography>
      </div>
    </Container>
  );
};

export default ProviderLogin;
