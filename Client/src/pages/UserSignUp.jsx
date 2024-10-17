import React from "react";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import styles from "../assets/styles/signUp.module.css";

const SignUpPage = () => {
  return (
    <div className={styles.signUpContainer}>
      <h1 className={styles.title}>Create Your Account</h1>
      <form className={styles.signUpForm}>
        <div className={styles.inputGroup}>
          <FaUser className={styles.inputIcon} />
          <input
            type="text"
            placeholder="Full Name"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.inputIcon} />
          <input
            type="email"
            placeholder="Email Address"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <FaLock className={styles.inputIcon} />
          <input
            type="password"
            placeholder="Password"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <FaPhoneAlt className={styles.inputIcon} />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.btn}>
          Sign Up
        </button>
      </form>
      <p className={styles.footerText}>
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
  );
};

export default SignUpPage;
