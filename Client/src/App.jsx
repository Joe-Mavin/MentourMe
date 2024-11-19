import { useState } from "react";
import "./App.css";
import "./index.css";
import LandingPage from "./pages/landing-page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/UserSignUp";
import LoginPage from "./pages/loginPage";
import UserDashboard from "./pages/UserDashboard";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./assets/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
