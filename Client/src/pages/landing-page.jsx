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

  const HERO_IMAGE = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80";

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 w-full z-20 transition-all bg-transparent backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
          <span className="text-3xl font-black tracking-widest text-primary">MentourMe</span>
          <nav className="hidden md:flex gap-6">
            <button className="text-primary font-semibold hover:underline" onClick={() => { localStorage.setItem('selectedRole', 'user'); navigate('/login'); }}>User Login</button>
            <button className="text-primary font-semibold hover:underline" onClick={() => { localStorage.setItem('selectedRole', 'mentor'); navigate('/login'); }}>Mentor Login</button>
            <button className="text-primary font-semibold hover:underline" onClick={() => { localStorage.setItem('selectedRole', 'therapist'); navigate('/login'); }}>Therapist Login</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[80vh] w-full pt-24 pb-12 bg-deepBlue">
        <img src={HERO_IMAGE} alt="Hero" className="absolute inset-0 w-full h-full object-cover object-center z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-deepBlue/90 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-2xl mx-auto">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight mb-4" style={{ letterSpacing: '0.04em' }}>
            Forge Brotherhood. Build Purpose.
          </h1>
          <p className="text-gray-200 text-lg md:text-2xl font-light mb-8 max-w-xl mx-auto">
            Unlock your full potential with mentorship, community, and growth programs for men.
          </p>
          <Link to="/signup">
            <button className="bg-accent text-deepBlue font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:brightness-110 transition-all focus:outline-accent focus:ring-2 focus:ring-accent">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-mutedGray py-16 px-4 md:px-0">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6">About MentourMe</h2>
            <p className="text-primary text-lg mb-6">MentourMe is a modern mentorship and personal development platform designed to empower men to unlock their full potential. The platform connects users with mentors, provides interactive onboarding, and helps track personal growth in key life areas.</p>
            <blockquote className="border-l-4 border-accent pl-4 italic text-xl font-serif text-primary/80 mb-4">“The journey to greatness is best walked together.”</blockquote>
          </div>
          <div className="flex justify-center">
            <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" alt="About" className="rounded-2xl shadow-xl w-full max-w-md object-cover" />
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default LandingPage;
