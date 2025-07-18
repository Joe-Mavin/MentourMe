import { useState } from "react";
import "./App.css";
import "./index.css";
import LandingPage from "./pages/landing-page";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import SignUpPage from "./pages/UserSignUp";
import LoginPage from "./pages/loginPage";
import UserDashboard from "./pages/UserDashboard";
import OnboardingContainer from "./components/Bot/Onboarding/OnboardingContainer";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./assets/theme";

// ProtectedRoute checks for JWT and onboarding status
function ProtectedRoute({ children, requireOnboarded }) {
  const token = localStorage.getItem('token');
  const onboarded = localStorage.getItem('onboarded') === 'true';
  if (!token) return <Navigate to="/login" replace />;
  if (requireOnboarded && !onboarded) return <Navigate to="/onboard" replace />;
  if (!requireOnboarded && onboarded) return <Navigate to="/dashboard" replace />;
  return children;
}

function App() {
  // Wrapper to use useNavigate in a non-route component
  const OnboardingWithRedirect = () => {
    const navigate = useNavigate();
    const handleOnboardingComplete = () => {
      localStorage.setItem('onboarded', 'true');
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
        <Route
          path="/onboard"
          element={
            <ProtectedRoute requireOnboarded={false}>
              <OnboardingWithRedirect />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireOnboarded={true}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
