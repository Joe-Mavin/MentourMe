import { useState } from "react";
import "./App.css";
import "./index.css";
import LandingPage from "./pages/landing-page";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import SignUpPage from "./pages/UserSignUp";
import LoginPage from "./pages/loginPage";
import UserDashboard, { ProfilePage, JourneyPage } from "./pages/UserDashboard";
import OnboardingContainer from "./components/Bot/Onboarding/OnboardingContainer";
import MentorDashboard from "./pages/MentorDashboard"; // Import MentorDashboard
import TherapistDashboard from "./pages/TherapistDashboard"; // Import TherapistDashboard
import MentorOnboardingContainer from './components/Bot/Onboarding/MentorOnboardingContainer';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./assets/theme";

// ProtectedRoute checks for JWT, onboarding status, and user role
function ProtectedRoute({ children, requireOnboarded, allowedRoles }) {
  const token = localStorage.getItem('token');
  const onboarded = localStorage.getItem('onboarded') === 'true';
  const userRole = localStorage.getItem('role'); // Get user role from localStorage

  if (!token) return <Navigate to="/login" replace />;

  // Handle onboarding redirects
  if (requireOnboarded && !onboarded) return <Navigate to="/onboard" replace />;
  if (!requireOnboarded && onboarded && userRole === 'user') return <Navigate to="/dashboard" replace />;

  // Handle role-based redirects
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect non-authorized roles to their respective dashboards or default
    if (userRole === 'mentor') return <Navigate to="/mentor-dashboard" replace />;
    if (userRole === 'therapist') return <Navigate to="/therapist-dashboard" replace />;
    return <Navigate to="/dashboard" replace />; // Default redirect for users
  }

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
            <ProtectedRoute requireOnboarded={false} allowedRoles={['user']}>
              <OnboardingWithRedirect />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireOnboarded={true} allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute requireOnboarded={true} allowedRoles={['user', 'mentor', 'therapist']}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journey"
          element={
            <ProtectedRoute requireOnboarded={true} allowedRoles={['user']}>
              <JourneyPage />
            </ProtectedRoute>
          }
        />
        {/* New Mentor and Therapist Dashboards */}
        <Route
          path="/mentor-dashboard"
          element={
            <ProtectedRoute allowedRoles={['mentor']}>
              <MentorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/therapist-dashboard"
          element={
            <ProtectedRoute allowedRoles={['therapist']}>
              <TherapistDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor-onboard"
          element={
            <ProtectedRoute requireOnboarded={false} allowedRoles={['mentor']}>
              <MentorOnboardingContainer onComplete={() => navigate('/mentor-dashboard')} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
