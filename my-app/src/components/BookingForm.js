import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@mui/material";
import "../styles/BookingForm.css"; 

const BookingForm = () => {
  const { providerId, serviceId } = useParams(); // Get providerId and serviceId from URL
  const [formData, setFormData] = useState({
    date: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    selectedTime: "",
  });

  const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
  const userId = localStorage.getItem("userId"); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, selectedTime: time });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please log in first!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/book", {
        userId,
        providerId,
        service: serviceId,
        date: formData.date,
        time: formData.selectedTime,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        notes: formData.notes,
      });

      if (response.status === 201) {
        alert("Booking successful!");
        navigate("/dashboard"); 
      } else {
        alert("Booking failed. Try again.");
      }
    } catch (error) {
      console.error("Error booking service:", error.response?.data || error);
      alert("Error booking service.");
    }
  };

  return (
    <Container className="booking-container">
      {/* Date & Time Section */}
      <div className="section">
        <Typography variant="h5" className="section-title">Choose Date & Time</Typography>
        <div className="date-time-container">
          <div className="input-group">
            <label>Select Date</label>
            <TextField
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-field"
              InputLabelProps={{ shrink: true }}
              required
            />
          </div>

          <div className="input-group">
            <label>Select Time</label>
            <div className="time-slots">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={formData.selectedTime === time ? "contained" : "outlined"}
                  className={`time-button ${formData.selectedTime === time ? "selected" : ""}`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="section">
        <Typography variant="h5" className="section-title">Personal Information</Typography>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input-field"
              required
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              required
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-field"
              required
            />
            <TextField
              label="Special Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="input-field notes-field"
              multiline
              rows={3}
            />
          </div>
          <Button type="submit" variant="contained" className="submit-button">Submit Booking</Button>
        </form>
      </div>
    </Container>
  );
};

export default BookingForm;
