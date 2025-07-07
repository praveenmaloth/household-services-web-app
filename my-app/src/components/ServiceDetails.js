import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardMedia, CardContent, Grid, Button } from "@mui/material";
import axios from "axios";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const serviceUrl = `http://localhost:5000/api/providers/${serviceId}`;
    console.log("Fetching from URL:", serviceUrl);
    
    axios.get(serviceUrl)
      .then((response) => {
        console.log("Providers data:", response.data);
        setProviders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching providers:", error);
      });
  }, [serviceId]);

  
  const handleBookNow = (provider) => {
    navigate(`/book/${provider.id}/${serviceId}`);
  };
  

  return (
    <Container>
      <Typography variant="h4">Available {serviceId} Providers</Typography>
      <Grid container spacing={3} style={{ marginTop: "10px" }}>
        {providers.length > 0 ? (
          providers.map((provider) => (
            <Grid item xs={12} sm={6} md={4} key={provider.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, overflow: "hidden" }}>
  <CardMedia
    component="img"
    height="200"
    image={provider.image}
    alt={provider.name}
    sx={{
      width: "100%",
      height: "200px",
      objectFit: "cover", 
      borderRadius: "8px 8px 0 0", 
    }}
  />
  <CardContent>
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
      {provider.name}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Experience: {provider.experience}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Location: {provider.location}
    </Typography>
    <Button 
      variant="contained" 
      color="primary" 
      fullWidth 
      sx={{ marginTop: 2, borderRadius: 2 }} 
      onClick={() => handleBookNow(provider)}
    >
      Book Now
    </Button>
  </CardContent>
</Card>


            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">No providers available for this service.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default ServiceDetails;
