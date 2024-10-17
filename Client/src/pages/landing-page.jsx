import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
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
    <>
      {/* Header */}
      <header className={styles.navbar}>
        <span className={styles.logo}>MentourMe</span>
        <Link to = '/login'>
        <button className={styles.btn}>
          <FaSignInAlt className={styles.icon} /> Log In
        </button>
        </Link>
      </header>

      {/* Hero Section with Background Video */}
      <section className={styles.hero}>
        <video className={styles.backgroundVideo} autoPlay loop muted>
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className={styles.heroContent}>
          <h1>Empowering Men Through Mentorship</h1>
          <p>
            Connect with experienced mentors and unlock your full potential.
          </p>
          <div className={styles.emailInput}>
            <FaEnvelope className={styles.inputIcon} />
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.input}
            />
            <button className={styles.btn}>Get Started</button>
          </div>
        </div>
      </section>

      {/* Why Choose MentourMe */}
      <section className={styles.whyChoose}>
        <h2>Why Choose MentourMe?</h2>
      </section>

      {/* Carousel Testimonials Section */}
      <section className={styles.testimonials}>
        <h2>What Our Members Say</h2>

        <Slider {...sliderSettings}>
          <div>
            <blockquote className={styles.testimonial}>
              <p>
                "MentourMe has been a game-changer for my personal and
                professional growth. The guidance I've received is invaluable."
              </p>
              <cite>- Bathlomeyo Ojuka, Software Engineer</cite>
            </blockquote>
          </div>
          <div>
            <blockquote className={styles.testimonial}>
              <p>
                "The mentors at MentourMe provided me with clarity and direction
                in both my career and personal life. I highly recommend it."
              </p>
              <cite>- James Okoth, Entrepreneur</cite>
            </blockquote>
          </div>
          <div>
            <blockquote className={styles.testimonial}>
              <p>
                "Thanks to MentourMe, I was able to network with industry
                experts who helped me land my dream job. I owe a lot to this
                platform."
              </p>
              <cite>- Mark Kiambura, Marketing Specialist</cite>
            </blockquote>
          </div>
        </Slider>
      </section>

      {/* Sign Up Call to Action Section */}
      <section className={styles.signUpCTA}>
        <h2>Ready to Unlock Your Potential?</h2>
        <p>
          Join our community of mentors and mentees. Sign up today and take the
          first step toward personal and professional growth!
        </p>
        <Link to="/signup">
          {" "}
          {/* Link to Sign Up page */}
          <button className={styles.btn}>Sign Up Now</button>
        </Link>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 MentourMe. All rights reserved.</p>
        <nav className={styles.footerNav}>
          <a href="#">
            <FaInfoCircle className={styles.footerIcon} /> About
          </a>
          <a href="#">
            <FaPhoneAlt className={styles.footerIcon} /> Contact
          </a>
          <a href="#">
            <FaLock className={styles.footerIcon} /> Privacy Policy
          </a>
        </nav>
      </footer>
    </>
  );
};

export default LandingPage;
