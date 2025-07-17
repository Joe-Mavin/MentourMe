import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import styles from "../assets/styles/login.module.css";
import { ENDPOINTS } from "../config/environment";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Clear any previous error messages

    try {
      const response = await fetch(ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Authentication failed.");
        setIsLoading(false);
        return;
      }

      const responseData = await response.json();
      if (responseData.token) {
        // Store the token in localStorage
        localStorage.setItem("token", responseData.token);

        // After successful login, check if the token is available
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/dashboard"); // Redirect to dashboard if token is found
        }
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Log In to Your Account</h1>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
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
        <button type="submit" className={styles.btn} disabled={isLoading}>
          {isLoading ? "Logging In..." : "Log In"}
        </button>
      </form>
      <p className={styles.footerText}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      <p className={styles.footerText}>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default LoginPage;
