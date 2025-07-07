import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Container, Box } from "@mui/material";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Home from "./components/Home";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import About from "./components/About";
import Services from "./components/Services";
import Profile from "./components/Profile";
import ServiceDetails from "./components/ServiceDetails";
import ProvideService from "./components/ProvideService";
import BookingForm from "./components/BookingForm";
import BookingDashboard from "./components/BookingDashboard";
import ProviderDashboard from "./components/ProviderDashBoard/ProviderDashboard";
import ServiceProviderLogin from "./components/ServiceProvidersLogin";
import "./App.css";
import "../src/components/ChatBot"
import ChatBot from "../src/components/ChatBot";
import "./components/ChatIframe"

// Styling for nav buttons
const navLinkStyle = {
  color: 'black',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: '500',
  marginRight: '15px',
  '&:hover': {
    color: '#1976d2',
    background: 'transparent',
  },
};

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavbarFooter = location.pathname === "/login" || location.pathname === "/provider-login" || location.pathname === "/register";

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  useEffect(() => {
    const providerId = localStorage.getItem("providerId");
    if (providerId) {
      navigate("/provider-dashboard");
    }
  }, [navigate]);

  return (
    <>
      {!hideNavbarFooter && (
        <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: "none", padding: "0 30px" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Logo/Brand */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                color: '#1976d2',
                textDecoration: 'none',
                fontSize: '22px',
              }}
            >
              Home<span style={{ color: '#000' }}>Services</span>
            </Typography>

            {/* Links & Menu */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button component={Link} to="/" sx={navLinkStyle}>Home</Button>
              <Button component={Link} to="/services" sx={navLinkStyle}>Services</Button>
              <Button component={Link} to="/about" sx={navLinkStyle}>About</Button>
              <Button component={Link} to="/contact" sx={navLinkStyle}>Contact Us</Button>

              {/* Dropdown Menu Icon */}
              <IconButton onClick={handleMenuOpen}>
                <MenuIcon sx={{ color: 'black' }} />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem component={Link} to="/reviews" onClick={handleMenuClose}>Reviews</MenuItem>
                {/* <MenuItem component={Link} to="/contact" onClick={handleMenuClose}>Contact Us</MenuItem>
                <MenuItem component={Link} to="/about" onClick={handleMenuClose}>About</MenuItem> */}
                <MenuItem component={Link} to="/provider-login" onClick={handleMenuClose}>Provider Login</MenuItem>
                <MenuItem component={Link} to="/provide-service" onClick={handleMenuClose}>Provide Service</MenuItem>
                <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>Your Bookings</MenuItem>
              </Menu>

              {/* Profile Icon */}
              <IconButton component={Link} to="/profile">
                <AccountCircle sx={{ color: 'black' }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* Main Content */}
      <Container>{children}
      <ChatBot/>
      </Container>

      {/* Footer */}
      {!hideNavbarFooter && (
        <footer style={{ textAlign: 'center', padding: '20px', marginTop: '40px', background: '#f1f1f1' }}>
          <Typography variant="body2">&copy; {new Date().getFullYear()} Household Services. All rights reserved.</Typography>
        </footer>
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/provider-login" element={<ServiceProviderLogin />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/service/:serviceId" element={<ServiceDetails />} />
          <Route path="/provide-service" element={<ProvideService />} />
          <Route path="/book/:providerId/:serviceId" element={<BookingForm />} />
          <Route path="/dashboard" element={<BookingDashboard />} />
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
