import React from "react";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { GiBroom, GiPaintBrush } from "react-icons/gi"; 
import { MdPlumbing, MdOutlineCarpenter, MdSecurity } from "react-icons/md"; 
import { FiZap } from "react-icons/fi"; 
import { FaBug } from "react-icons/fa"; 
import { TbAirConditioning } from "react-icons/tb"; 
import { Link } from "react-router-dom";
import "../styles/Services.css";

const services = [
  { title: "Cleaning", image: "/images/clean.jpeg", description: "Professional home cleaning services.", icon: <GiBroom size={24} color="green"/> },
  { title: "AC Repair", image: "/images/ac.webp", description: "Expert AC repair and maintenance.", icon: <TbAirConditioning size={24} color="blue"/> },
  { title: "Electrician", image: "/images/elec.jpeg", description: "Certified electrical services with care.", icon: <FiZap size={24} color="yellow"/> },
  { title: "Plumbing", image: "/images/plumb.jpeg", description: "Expert solutions for all plumbing needs.", icon: <MdPlumbing size={24} color="blue"/> },
  { title: "Carpentry", image: "/images/car.jpeg", description: "Skilled carpentry and woodwork.", icon: <MdOutlineCarpenter size={24} color="brown"/> },
  { title: "Painting", image: "/images/paint.jpeg", description: "Quality painting services for home and office.", icon: <GiPaintBrush size={24} color="red"/> },
  { title: "Pest Control", image: "/images/pest.jpg", description: "Effective pest control solutions.", icon: <FaBug size={24} color="purple"/> },
  { title: "Home Security", image: "/images/home.jpeg", description: "Smart home security installations.", icon: <MdSecurity size={24} color="black"/> }
];

const Services = () => {
  return (
    <Container className="services-container">
      <Typography variant="h4" gutterBottom>Our Services</Typography>
      <Grid container spacing={4}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={3} key={service.title}>
            <Card className="service-card">
              <CardMedia component="img" height="140" image={service.image} alt={service.title} />
              <CardContent>
                <Typography variant="h5" component="div">
                  {service.icon} {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">{service.description}</Typography>
              </CardContent>
              <Link to={`/service/${service.title.toLowerCase().replace(/\s+/g, " ")}`} style={{ textDecoration: 'none' }}>
                <Button size="small" className="learn-more-btn">Service Details</Button>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;
