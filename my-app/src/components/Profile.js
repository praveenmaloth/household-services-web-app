import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Avatar, Box } from "@mui/material";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", profileImage: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/user", { withCredentials: true })
      .then(({ data }) => setUser(data.user))
      .catch(() => console.error("Error fetching user"));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file)); // Show preview before uploading
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const { data } = await axios.post("http://localhost:5000/api/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser((prev) => ({ ...prev, profileImage: data.imageUrl }));
      return data.imageUrl; // Return the uploaded image URL
    } catch (error) {
      alert("Image upload failed");
      return null;
    }
  };

  const handleUpdate = async () => {
    let imageUrl = user.profileImage;
  
    if (selectedImage) {
      const uploadedImageUrl = await handleImageUpload();
      if (!uploadedImageUrl) return;
      imageUrl = uploadedImageUrl;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/update-profile",
        { name: user.name, profileImage: imageUrl }, 
        { withCredentials: true }
      );
  
      if (response.data.success) {
        alert("Profile updated successfully");
        window.location.reload();
      } else {
        alert("Profile update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert("Error updating profile");
    }
  };
  
  const handleLogout = () => {
    axios.get("http://localhost:5000/api/logout", { withCredentials: true })
      .then(() => (window.location.href = "/"))
      .catch(() => alert("Logout failed"));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Profile</Typography>

      {/* Profile Image Section */}
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          src={previewImage || user.profileImage || "/default-avatar.png"}
          sx={{ width: 80, height: 80 }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </Box>

      <TextField label="Name" name="name" value={user.name} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Email" name="email" value={user.email} disabled fullWidth margin="normal" />
      
      <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2, mr: 2 }}>
        Update Profile
      </Button>
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Container>
  );
};

export default Profile;
