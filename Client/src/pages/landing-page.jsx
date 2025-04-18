import React from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaPhoneAlt, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./LandingPage.module.css";
import Slider from "./Slider"; // Assuming your custom slider component

const testimonials = [
  {
    text:
      "The mentors at MentourMe provided me with clarity and direction in both my career and personal life. I highly recommend it.",
    author: "James Okoth, Entrepreneur",
  },
  {
    text:
      "Thanks to MentourMe, I was able to network with industry experts who helped me land my dream job. I owe a lot to this platform.",
    author: "Mark Kiambura, Marketing Specialist",
  },
];

const LandingPage = () => {
  return (
    <>
      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.sectionTitle}
        >
          What Our Users Say
        </motion.h2>
        <Slider>
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              className={styles.testimonialCard}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <blockquote className={styles.testimonial}>
                <p>"{item.text}"</p>
                <cite>- {item.author}</cite>
              </blockquote>
            </motion.div>
          ))}
        </Slider>
      </section>

      {/* Sign Up Call to Action Section */}
      <motion.section
        className={styles.signUpCTA}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2>Ready to Unlock Your Potential?</h2>
        <p>
          Join our community of mentors and mentees. Sign up today and take the
          first step toward personal and professional growth!
        </p>
        <Link to="/signup">
          <button className={styles.btn}>Sign Up Now</button>
        </Link>
      </motion.section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 MentourMe. All rights reserved.</p>
        <nav className={styles.footerNav}>
          <Link to="/about">
            <FaInfoCircle className={styles.footerIcon} /> About
          </Link>
          <Link to="/contact">
            <FaPhoneAlt className={styles.footerIcon} /> Contact
          </Link>
          <Link to="/privacy">
            <FaLock className={styles.footerIcon} /> Privacy Policy
          </Link>
        </nav>
      </footer>
    </>
  );
};

export default LandingPage;
