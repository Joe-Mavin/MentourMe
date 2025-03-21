import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhoneAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import styles from "../assets/styles/signUp.module.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle form input changes
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate input fields
  const validateInput = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      return "Please provide a valid email address.";
    if (!/^\+[1-9]\d{1,14}$/.test(formData.phone))
      return "Please provide a valid phone number (e.g., +1234567890).";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters.";
    return null;
  };

  // Handle form submission
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "/api/auth/signup",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess("Account created successfully!");
      console.log(response.data);

      // Redirect after success
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to create an account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <h1 className={styles.title}>Create Your Account</h1>
      <form className={styles.signUpForm} onSubmit={HandleSubmit}>
        <div className={styles.inputGroup}>
          <FaUser className={styles.inputIcon} />
          <input
            type="text"
            placeholder="Full Name"
            required
            className={styles.input}
            name="name"
            value={formData.name}
            onChange={HandleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.inputIcon} />
          <input
            type="email"
            placeholder="Email Address"
            required
            className={styles.input}
            name="email"
            value={formData.email}
            onChange={HandleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <FaLock className={styles.inputIcon} />
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className={styles.input}
              name="password"
              value={formData.password}
              onChange={HandleChange}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
              role="button"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <FaPhoneAlt className={styles.inputIcon} />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            className={styles.input}
            name="phone"
            value={formData.phone}
            onChange={HandleChange}
          />
        </div>

        <button type="submit" className={styles.btn} disabled={isLoading}>
          {isLoading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      {error && <p className={styles.errorText}>{error}</p>}
      {success && <p className={styles.successText}>{success}</p>}

      <p className={styles.footerText}>
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
  );
};

export default SignUpPage;
