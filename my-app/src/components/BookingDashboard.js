import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, Grid, Button } from "@mui/material";

const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:5000/api/bookings/${userId}`)
      .then((response) => {
        console.log("Fetched bookings:", response.data); 
        setBookings(response.data);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [userId]);

  const handleCancelBooking = async (bookingId) => {
    console.log("Attempting to cancel booking with ID:", bookingId); // Debug log

    if (!bookingId) {
      alert("Invalid booking ID!");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
      
      if (response.status === 200) {
        console.log("Booking cancelled successfully:", response.data);
        setBookings(bookings.filter((booking) => booking.id !== bookingId)); 
        alert("Booking cancelled successfully.");
      } else {
        console.log("Unexpected response status:", response.status);
        alert("Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking.");
    }
  };

  return (
    <Container>
      <Typography variant="h4">My Bookings</Typography>
      <Grid container spacing={3} style={{ marginTop: "10px" }}>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{booking.service}</Typography>
                  <Typography variant="body2">Date: {booking.booking_date}</Typography>
                  <Typography variant="body2">Time: {booking.time}</Typography>
                  <Typography variant="body2">Address: {booking.address}</Typography>
                  <Typography variant="body2">Status: {booking.status}</Typography>
                  {booking.status === "Pending" && (
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      style={{ marginTop: "10px" }}
                      onClick={() => handleCancelBooking(booking.id)} 
                    >
                      Cancel Booking
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">No bookings found.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default BookingDashboard;
