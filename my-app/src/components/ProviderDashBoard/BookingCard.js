import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import "../../styles/BookingCard.css";

const BookingCard = ({ booking, onRespond }) => {
  const [status, setStatus] = useState(booking.status); // Track status locally

  const handleResponse = async (newStatus) => {
    await onRespond(booking.id, newStatus);
    setStatus(newStatus); // Update UI after response
  };

  return (
    <Card style={{ marginBottom: "15px", padding: "10px" }}>
      <CardContent>
        <Typography variant="h6">Service: {booking.service}</Typography>
        <Typography>Date: {booking.date} | Time: {booking.time}</Typography>
        <Typography>Customer: {booking.name}</Typography>
        <Typography>Address: {booking.address}</Typography>
        <Typography>Phone: {booking.phone}</Typography>

        {/* Show Accept/Reject buttons only if status is pending */}
        {status?.toLowerCase() === "pending" && (
          <div style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleResponse("accepted")}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleResponse("rejected")}
              style={{ marginLeft: "10px" }}
            >
              Reject
            </Button>
          </div>
        )}

        {/* Show updated status */}
        {status?.toLowerCase() === "accepted" && (
          <Typography style={{ color: "green", marginTop: "10px" }}>
            ✅ Accepted
          </Typography>
        )}
        {status?.toLowerCase() === "rejected" && (
          <Typography style={{ color: "red", marginTop: "10px" }}>
            ❌ Rejected
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCard;
