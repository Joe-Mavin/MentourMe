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
import { Box, Card, CardContent, Typography, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import styles from "../assets/styles/signUp.module.css";
import { ENDPOINTS } from "../config/environment";

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
        ENDPOINTS.AUTH.SIGNUP,
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
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="background.default" px={2}>
      <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 4, boxShadow: 3, p: { xs: 1, sm: 2 } }}>
        <CardContent>
          <Typography variant="h4" fontWeight={800} color="primary" mb={2} textAlign="center">
            Create Your Account
          </Typography>
          <form onSubmit={HandleSubmit} style={{ width: '100%' }}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={HandleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={HandleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaEnvelope />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={HandleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={HandleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaPhoneAlt />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ borderRadius: 3, fontWeight: 700, mt: 1 }}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Sign Up"}
              </Button>
            </Box>
          </form>
          {error && <Typography color="error" mt={2} textAlign="center">{error}</Typography>}
          {success && <Typography color="success.main" mt={2} textAlign="center">{success}</Typography>}
          <Typography variant="body2" color="text.secondary" mt={3} textAlign="center">
            Already have an account? <a href="/login" style={{ color: '#3a8bfd', textDecoration: 'underline' }}>Log In</a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUpPage;
