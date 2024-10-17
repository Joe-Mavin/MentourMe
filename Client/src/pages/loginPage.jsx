import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import styles from "../assets/styles/login.module.css";

const LoginPage = () => {
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Log In to Your Account</h1>
      <form className={styles.loginForm}>
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
        <button type="submit" className={styles.btn}>
          Log In
        </button>
      </form>
      <p className={styles.footerText}>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
      <p className={styles.footerText}>
        <a href="/forgot-password">Forgot Password?</a>
      </p>
    </div>
  );
};

export default LoginPage;
