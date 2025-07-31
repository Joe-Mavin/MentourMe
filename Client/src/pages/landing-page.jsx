import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Box, Typography, Button, Grid, useTheme } from "@mui/material";
import {
  FaSignInAlt,
  FaEnvelope,
  FaInfoCircle,
  FaPhoneAlt,
  FaLock,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../assets/styles/global.module.css";
import SignUpPage from "./UserSignUp";

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, md: 6 },
          py: 2,
          bgcolor: 'transparent',
        }}
      >
        <Typography variant="h5" fontWeight={900} color="primary" sx={{ letterSpacing: 2 }}>
          MentourMe
        </Typography>
        {/* Role selection buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => { localStorage.setItem('selectedRole', 'user'); navigate('/login'); }}
            sx={{ borderRadius: 3, fontWeight: 700 }}
          >
            Continue as User
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => { localStorage.setItem('selectedRole', 'mentor'); navigate('/login'); }}
            sx={{ borderRadius: 3, fontWeight: 700 }}
          >
            Continue as Mentor
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={() => { localStorage.setItem('selectedRole', 'therapist'); navigate('/login'); }}
            sx={{ borderRadius: 3, fontWeight: 700 }}
          >
            Continue as Therapist
          </Button>
        </Box>
      </Box>

      {/* Hero Section with Background Video */}
      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 6 },
          minHeight: { xs: 400, md: 520 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="video"
          autoPlay
          loop
          muted
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </Box>
        <Box sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 700 }}>
          <Typography variant="h2" fontWeight={900} color="#fff" mb={2} sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            Empowering Men Through Mentorship
          </Typography>
          <Typography variant="h6" color="#bfc9e0" mb={3}>
            Connect with experienced mentors and unlock your full potential.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: 2,
              mt: 2,
              width: '100%',
              maxWidth: 400,
              mx: 'auto',
            }}
          >
            <FaEnvelope style={{ fontSize: 24, color: theme.palette.primary.main }} />
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '1rem',
                borderRadius: 8,
                border: 'none',
                outline: 'none',
                marginRight: 8,
                width: '100%',
                marginBottom: 8,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 3, fontWeight: 700, width: { xs: '100%', sm: 'auto' } }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Why Choose MentourMe */}
      <Box sx={{ textAlign: 'center', py: { xs: 4, md: 8 }, px: { xs: 2, md: 6 } }}>
        <Typography variant="h4" fontWeight={800} color="primary" mb={2}>
          Why Choose MentourMe?
        </Typography>
      </Box>

      {/* Carousel Testimonials Section */}
      <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 6 } }}>
        <Typography variant="h4" fontWeight={800} color="primary" mb={2} textAlign="center">
          What Our Members Say
        </Typography>
        <Slider {...sliderSettings}>
          <Box>
            <Typography variant="body1" color="text.secondary" fontStyle="italic" mb={1}>
              "MentourMe has been a game-changer for my personal and professional growth. The guidance I've received is invaluable."
            </Typography>
            <Typography variant="subtitle2" color="primary" fontWeight={700}>
              - Bathlomeyo Ojuka, Software Engineer
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" color="text.secondary" fontStyle="italic" mb={1}>
              "The mentors at MentourMe provided me with clarity and direction in both my career and personal life. I highly recommend it."
            </Typography>
            <Typography variant="subtitle2" color="primary" fontWeight={700}>
              - James Okoth, Entrepreneur
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" color="text.secondary" fontStyle="italic" mb={1}>
              "Thanks to MentourMe, I was able to network with industry experts who helped me land my dream job. I owe a lot to this platform."
            </Typography>
            <Typography variant="subtitle2" color="primary" fontWeight={700}>
              - Mark Kiambura, Marketing Specialist
            </Typography>
          </Box>
        </Slider>
      </Box>

      {/* Sign Up Call to Action Section */}
      <Box sx={{ textAlign: 'center', py: { xs: 4, md: 8 }, px: { xs: 2, md: 6 } }}>
        <Typography variant="h4" fontWeight={800} color="primary" mb={2}>
          Ready to Unlock Your Potential?
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Join our community of mentors and mentees. Sign up today and take the first step toward personal and professional growth!
        </Typography>
        <Link to="/signup">
          <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 3, fontWeight: 700 }}>
            Sign Up Now
          </Button>
        </Link>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'transparent', color: 'text.secondary', textAlign: 'center', py: 3 }}>
        <Typography variant="body2" mb={1}>
          © 2024 MentourMe. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap', mt: 1 }}>
          <Box component="a" href="#" sx={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaInfoCircle /> About
          </Box>
          <Box component="a" href="#" sx={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaPhoneAlt /> Contact
          </Box>
          <Box component="a" href="#" sx={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaLock /> Privacy Policy
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
