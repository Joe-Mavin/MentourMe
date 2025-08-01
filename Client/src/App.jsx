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
import Messages from './pages/Messages';
import UserProfile from './pages/UserProfile';
import SuperMentorApprovalPanel from './pages/SuperMentorApprovalPanel';

// ProtectedRoute checks for JWT, onboarding status, and user role
function ProtectedRoute({ children, requireOnboarded, allowedRoles }) {
  const token = localStorage.getItem('token');
  const onboarded = localStorage.getItem('onboarded') === 'true';
  const userRole = localStorage.getItem('role');

  if (!token) return <Navigate to="/login" replace />;

  // Handle onboarding redirects
  if (requireOnboarded && !onboarded) {
    if (userRole === 'mentor') return <Navigate to="/mentor-onboard" replace />;
    if (userRole === 'user') return <Navigate to="/onboard" replace />;
    // Add therapist onboarding if needed
  }
  if (!requireOnboarded && onboarded && userRole === 'user') return <Navigate to="/dashboard" replace />;
  if (!requireOnboarded && onboarded && userRole === 'mentor') return <Navigate to="/mentor-dashboard" replace />;

  // Handle role-based redirects
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    if (userRole === 'mentor') return <Navigate to="/mentor-dashboard" replace />;
    if (userRole === 'therapist') return <Navigate to="/therapist-dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
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

  const MentorOnboardingWithRedirect = () => {
    const navigate = useNavigate();
    const handleMentorOnboardingComplete = () => {
      localStorage.setItem('onboarded', 'true');
      navigate("/mentor-dashboard");
    };
    return <MentorOnboardingContainer onComplete={handleMentorOnboardingComplete} />;
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
          path="/profile/:id"
          element={
            <ProtectedRoute allowedRoles={["user", "mentor", "therapist"]}>
              <UserProfile />
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
        <Route
          path="/messages"
          element={
            <ProtectedRoute allowedRoles={["user", "mentor", "therapist"]}>
              <Messages />
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
              <MentorOnboardingWithRedirect />
            </ProtectedRoute>
          }
        />
        <Route path="/super-mentor-approval-panel-2025" element={<SuperMentorApprovalPanel />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
