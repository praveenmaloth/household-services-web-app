import React, { useState } from "react";
import { Container, Typography, TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import "../styles/ProviderApplication.css"

const serviceOptions = ["Cleaning", "AC Repair", "Electrician", "Plumbing", "Carpentry", "Painting", "Pest Control", "Home Security"];

const ProvideService = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    service: "",
    experience: "",
    location: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const imageData = new FormData();
    imageData.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", imageData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData((prev) => ({ ...prev, image: res.data.imageUrl }));
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/providers", formData);
      alert("Service Provider Registered Successfully!");
    } catch (error) {
      console.error("Error registering provider", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Become a Service Provider</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Full Name" name="name" fullWidth required margin="normal" onChange={handleChange} />
        <TextField label="Email" name="email" type="email" fullWidth required margin="normal" onChange={handleChange} />
        <TextField label="Password" name="password" type="password" fullWidth required margin="normal" onChange={handleChange} />
        <TextField select label="Select Service" name="service" fullWidth required margin="normal" onChange={handleChange}>
          {serviceOptions.map((service) => (
            <MenuItem key={service} value={service}>{service}</MenuItem>
          ))}
        </TextField>
        <TextField label="Years of Experience" name="experience" fullWidth required margin="normal" onChange={handleChange} />
        <TextField label="Location" name="location" fullWidth required margin="normal" onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "20px" }}>Register</Button>
      </form>
    </Container>
  );
};

export default ProvideService;
