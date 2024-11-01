import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import styles from "../assets/styles/login.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Replace with your actual API endpoint and authentication logic
    const response = await fetch("https://yourapi.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      // If authentication is successful, redirect to dashboard
      navigate("/dashboard");
    } else {
      // Handle errors (e.g., show a message to the user)
      alert("Authentication failed. Please check your credentials.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Log In to Your Account</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.inputIcon} />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <FaLock className={styles.inputIcon} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
