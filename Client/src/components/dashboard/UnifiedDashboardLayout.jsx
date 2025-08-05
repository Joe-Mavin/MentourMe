import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  Hidden,
  Card,
  CardContent,
  Avatar,
  Grid,
  Chip,
  Divider,
  Badge,
  TextField,
  CircularProgress,
  Alert
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TimelineIcon from '@mui/icons-material/Timeline';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import FeedbackIcon from '@mui/icons-material/Feedback';
import StarIcon from '@mui/icons-material/Star';
import MessageIcon from '@mui/icons-material/Message';
import EventIcon from '@mui/icons-material/Event';
import Sidebar from './sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import UserDashboardContent from './UserDashboard/UserDashboardContent';
import MentorDashboardContent from './MentorDashboard/MentorDashboardContent';
import TherapistDashboardContent from './TherapistDashboard/TherapistDashboardContent';
import { useJourney } from '../../hooks/useJourney';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import API from '../../services/api';
import { ENDPOINTS } from '../../config/environment';

const drawerWidth = 260;

const UnifiedDashboardLayout = ({ currentUser, currentUserRole, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Custom hooks for data management (only for users)
  const journeyData = useJourney();
  const leaderboardData = useLeaderboard();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  // Handle journey generation with snackbar feedback (only for users)
  const handleGenerateJourney = async () => {
    const result = await journeyData.generateJourney();
    setSnackbar({
      open: true,
      message: result.message,
      severity: result.success ? 'success' : 'error',
    });
  };

  // Render content based on current route and user role
  const renderContent = () => {
    // If children are passed (like for Messages), render them
    if (children) {
      return children;
    }

    switch (location.pathname) {
      case '/dashboard':
        if (currentUserRole === 'user') {
          return (
            <UserDashboardContent
              journeyData={{
                ...journeyData,
                generateJourney: handleGenerateJourney,
              }}
              leaderboardData={leaderboardData}
              currentUser={currentUser}
            />
          );
        }
        break;
      
      case '/mentor-dashboard':
        if (currentUserRole === 'mentor') {
          return <MentorDashboardContent />;
        }
        break;
      
      case '/therapist-dashboard':
        if (currentUserRole === 'therapist') {
          return <TherapistDashboardContent />;
        }
        break;
      
      case '/profile':
      case '/mentor-profile':
        return <ProfileContent />;
      
      case '/journey':
        if (currentUserRole === 'user') {
          return <JourneyContent />;
        }
        break;
      
      default:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4">Page not found</Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'primary.main',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Welcome, {currentUser || currentUserRole}!
          </Typography>
          <Button color="inherit" onClick={() => navigate('/profile')}>
            Profile
          </Button>
        </Toolbar>
      </AppBar>
      
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Sidebar />
        </Drawer>
      </Hidden>
      
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Hidden>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8
        }}
      >
        {renderContent()}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

// Profile Content Component
const ProfileContent = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get(ENDPOINTS.AUTH.PROFILE, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data.user);
      } catch (err) {
        setError('Failed to load profile');
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h3" fontWeight={900} color="primary" mb={3} textAlign="center">
        Profile
      </Typography>
      
      <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={2} textAlign="center">
              <Avatar
                src={profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || 'User')}`}
                alt="Profile"
                sx={{ width: 100, height: 100, mx: "auto", mb: 2, fontSize: 40 }}
              >
                {profile ? getInitials(profile.name) : <PersonIcon fontSize="large" />}
              </Avatar>
              <Chip label={profile?.role || 'User'} color="primary" sx={{ mt: 1 }} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h5" fontWeight={800}>{profile?.name}</Typography>
              <Typography color="text.secondary" mb={1}>{profile?.email}</Typography>
              <Typography variant="body1" mb={1}><b>Bio:</b> {profile?.bio || "No bio provided."}</Typography>
              <Typography variant="body1" mb={1}><b>Phone:</b> {profile?.phone || "Not provided"}</Typography>
              <Typography variant="body1" mb={1}><b>Status:</b> {profile?.status || "Active"}</Typography>
            </Grid>
            <Grid item xs={12} md={3} textAlign="center">
              <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                <Button variant="outlined" color="primary" startIcon={<EmailIcon />}>
                  Contact
                </Button>
                <Button variant="outlined" color="primary" startIcon={<MessageIcon />}>
                  Message
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

// Journey Content Component (for users only)
const JourneyContent = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h3" fontWeight={900} color="primary" mb={3} textAlign="center">
        Journey
      </Typography>
      <Typography variant="body1" textAlign="center">
        Journey content will be displayed here.
      </Typography>
    </Box>
  );
};

export default UnifiedDashboardLayout; 