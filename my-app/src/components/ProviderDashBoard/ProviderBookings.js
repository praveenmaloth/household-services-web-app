import React, { useEffect, useState } from "react";
import { getProviderBookings, respondToBooking } from "../Services/api";
import BookingCard from "./BookingCard";
import { Container, Typography, CircularProgress } from "@mui/material";
import "../../styles/ProviderBookings.css";

const ProviderBookings = ({ providerId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      console.log("Fetching bookings...");
      const response = await getProviderBookings(providerId);
      setBookings(response.data);
      console.log("Bookings fetched:", response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (bookingId, status) => {
    try {
      console.log(`Updating booking ID ${bookingId} to ${status}`);
      await respondToBooking(bookingId, status);
      fetchBookings(); // Refresh bookings after response
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : bookings.length === 0 ? (
        <Typography>No bookings found.</Typography>
      ) : (
        bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} onRespond={handleRespond} />
        ))
      )}
    </Container>
  );
};

export default ProviderBookings;
