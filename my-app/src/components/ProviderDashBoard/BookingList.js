import React, { useEffect, useState } from "react";
import { getProviderBookings, respondToBooking } from "../../components/Services/api";
import BookingCard from "./BookingCard";

const BookingList = ({ providerId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getProviderBookings(providerId);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleRespond = async (bookingId, status) => {
    try {
      await respondToBooking(bookingId, status);
      fetchBookings(); // Refresh the list after responding
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <div>
      {bookings.length === 0 ? <p>No bookings available.</p> : 
        bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} onRespond={handleRespond} />
        ))
      }
    </div>
  );
};

export default BookingList;
