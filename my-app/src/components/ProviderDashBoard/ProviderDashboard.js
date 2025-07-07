import React from "react";
import { useNavigate } from "react-router-dom";
import ProviderBookings from "./ProviderBookings"; 
import Notification from "./Notification";
import { Container, Typography, Button, AppBar, Toolbar } from "@mui/material";

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const providerId = localStorage.getItem("providerId"); 

  if (!providerId) {
    return <Typography>Please log in as a service provider.</Typography>;
  }

  const handleLogout = () => {
    localStorage.removeItem("providerId");
    navigate("/provider-login"); 
  };

  return (
    <Container>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate("/provider-dashboard")}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={handleLogout} style={{ marginLeft: "auto" }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Dashboard Content */}
      <Typography variant="h4" style={{ marginTop: "20px" }}>
        Service Provider Dashboard
      </Typography>

      {/* Notifications and Bookings */}
      <Notification providerId={providerId} />
      <ProviderBookings providerId={providerId} />
    </Container>
  );
};

export default ProviderDashboard;
