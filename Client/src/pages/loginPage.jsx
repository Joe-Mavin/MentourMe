import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Box, Card, CardContent, Typography, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import styles from "../assets/styles/login.module.css";
import { ENDPOINTS } from "../config/environment";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        // Store onboarding status
        localStorage.setItem("onboarded", responseData.onboarded ? 'true' : 'false');

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
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="background.default" px={2}>
      <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 4, boxShadow: 3, p: { xs: 1, sm: 2 } }}>
        <CardContent>
          <Typography variant="h4" fontWeight={800} color="primary" mb={2} textAlign="center">
            Log In to Your Account
          </Typography>
          {errorMessage && <Typography color="error" mb={2} textAlign="center">{errorMessage}</Typography>}
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                        {showPassword ? <FaLock /> : <FaLock />}
                      </IconButton>
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
                {isLoading ? "Logging In..." : "Log In"}
              </Button>
            </Box>
          </form>
          <Typography variant="body2" color="text.secondary" mt={3} textAlign="center">
            Don't have an account? <Link to="/signup" style={{ color: '#3a8bfd', textDecoration: 'underline' }}>Sign Up</Link>
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1} textAlign="center">
            <Link to="/forgot-password" style={{ color: '#3a8bfd', textDecoration: 'underline' }}>Forgot Password?</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
