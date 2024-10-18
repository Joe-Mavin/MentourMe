import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import styles from "../assets/styles/signUp.module.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors
    setSuccess(""); // Reset previous success

    try {
      const response = await fetch("http://localhost:5000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create an account. Please try again.");
      }

      const data = await response.json();
      setSuccess("Account created successfully!");
      console.log(data);
    } catch (error) {
      setError(error.message);
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
          <input
            type="password"
            placeholder="Password"
            required
            className={styles.input}
            name="password"
            value={formData.password}
            onChange={HandleChange}
          />
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
        <button type="submit" className={styles.btn}>
          Sign Up
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
