import { useState } from "react";
import "./App.css";
import "./index.css";
import LandingPage from "./pages/landing-page";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import SignUpPage from "./pages/UserSignUp";
import LoginPage from "./pages/loginPage";
import UserDashboard from "./pages/UserDashboard";
import OnboardingContainer from "./components/Bot/Onboarding/OnboardingContainer";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./assets/theme";

function App() {
  // Wrapper to use useNavigate in a non-route component
  const OnboardingWithRedirect = () => {
    const navigate = useNavigate();
    const handleOnboardingComplete = () => {
      navigate("/dashboard");
    };
    return <OnboardingContainer onComplete={handleOnboardingComplete} />;
  };

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/onboard" element={<OnboardingWithRedirect />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
