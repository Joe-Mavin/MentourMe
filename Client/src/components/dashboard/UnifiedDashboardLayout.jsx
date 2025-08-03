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
import Sidebar from './sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import UserDashboardContent from './UserDashboard/UserDashboardContent';
import ConversationList from '../messages/ConversationList';
import ChatInterface from '../messages/ChatInterface';
import { useMessages } from '../../hooks/useMessages';
import { useJourney } from '../../hooks/useJourney';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { ENDPOINTS } from '../../config/environment';

const drawerWidth = 260;

const UnifiedDashboardLayout = ({ currentUser, currentUserRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Custom hooks for data management
  const journeyData = useJourney();
  const leaderboardData = useLeaderboard();
  const messagesData = useMessages();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  // Handle journey generation with snackbar feedback
  const handleGenerateJourney = async () => {
    const result = await journeyData.generateJourney();
    setSnackbar({
      open: true,
      message: result.message,
      severity: result.success ? 'success' : 'error',
    });
  };

  // Render content based on current route
  const renderContent = () => {
    switch (location.pathname) {
      case '/dashboard':
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
      
      case '/messages':
        return (
          <Box sx={{ display: 'flex', height: 'calc(100vh - 120px)' }}>
            <ConversationList
              tab={messagesData.tab}
              setTab={messagesData.setTab}
              conversations={messagesData.conversations}
              mentors={messagesData.mentors}
              mentorError={messagesData.mentorError}
              selectedUser={messagesData.selectedUser}
              onSelectConversation={messagesData.fetchConversation}
            />
            <ChatInterface
              selectedUser={messagesData.selectedUser}
              messages={messagesData.messages}
              newMessage={messagesData.newMessage}
              setNewMessage={messagesData.setNewMessage}
              onSendMessage={messagesData.handleSend}
              paramUserId={null}
            />
          </Box>
        );
      
      case '/profile':
        return <ProfileContent />;
      
      case '/journey':
        return <JourneyContent />;
      
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
            Welcome, {currentUser || 'User'}!
          </Typography>
          {/* Navigation for different roles */}
          {currentUserRole === 'mentor' && (
            <Button color="inherit" onClick={() => navigate('/mentor-dashboard')}>
              Mentor Dashboard
            </Button>
          )}
          {currentUserRole === 'therapist' && (
            <Button color="inherit" onClick={() => navigate('/therapist-dashboard')}>
              Therapist Dashboard
            </Button>
          )}
          {/* Example: A generic profile link always visible */}
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
          mt: 8,
          overflow: 'auto',
          bgcolor: 'background.default',
        }}
      >
        {renderContent()}
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }} 
          elevation={6} 
          variant="filled"
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

// Profile Content Component
const ProfileContent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(ENDPOINTS.AUTH.PROFILE, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Helper for avatar initials
  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="background.default" px={2}>
      <Card sx={{ maxWidth: 420, width: '100%', borderRadius: 4, boxShadow: 6, p: 0, overflow: 'hidden' }}>
        {/* Gradient header with avatar */}
        <Box sx={{
          background: 'linear-gradient(90deg, #3a8bfd 0%, #1e40af 100%)',
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Box sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'background.paper',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 3,
            mb: 2,
          }}>
            <Typography variant="h3" color="primary" fontWeight={900}>
              {user ? getInitials(user.name) : <PersonIcon fontSize="large" />}
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight={800} color="#fff">
            {user ? user.name : 'Profile'}
          </Typography>
        </Box>
        <CardContent>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          {user && (
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <EmailIcon color="primary" />
                <Typography><strong>Email:</strong> {user.email}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <PhoneIcon color="primary" />
                <Typography><strong>Phone:</strong> {user.phone}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                {user.onboarded ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                <Typography><strong>Onboarded:</strong> {user.onboarded ? 'Yes' : 'No'}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

// Journey Content Component
const JourneyContent = () => {
  // Mock journey data
  const journey = {
    goal: 'Personal Development',
    startDate: '2024-07-01',
    totalTasks: 7,
    completedTasks: 3,
    tasks: [
      { day: 1, desc: 'Write down your top 3 personal goals.', done: true },
      { day: 2, desc: 'Reflect on a recent challenge and how you handled it.', done: true },
      { day: 3, desc: 'Read a chapter from a self-improvement book.', done: true },
      { day: 4, desc: 'Practice 10 minutes of mindfulness meditation.', done: false, today: true, due: '2024-07-04' },
      { day: 5, desc: 'Reach out to a mentor or peer for advice.', done: false },
      { day: 6, desc: 'Set a new micro-habit for the week.', done: false },
      { day: 7, desc: 'Review your progress and journal your thoughts.', done: false },
    ],
  };
  const todayTask = journey.tasks.find(t => t.today);
  const progress = (journey.completedTasks / journey.totalTasks) * 100;

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="background.default" px={2}>
      <Card sx={{ maxWidth: 500, width: '100%', borderRadius: 4, boxShadow: 6, p: 0, overflow: 'hidden' }}>
        <Box sx={{
          background: 'linear-gradient(90deg, #3a8bfd 0%, #1e40af 100%)',
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <TimelineIcon sx={{ fontSize: 48, color: '#fff', mb: 1 }} />
          <Typography variant="h5" fontWeight={800} color="#fff">
            My Journey: {journey.goal}
          </Typography>
          <Box width="80%" mt={2}>
            <Box sx={{ height: 10, bgcolor: '#1e2a78', borderRadius: 5, overflow: 'hidden' }}>
              <Box sx={{ width: `${progress}%`, height: '100%', bgcolor: '#3a8bfd', transition: 'width 0.5s' }} />
            </Box>
            <Typography variant="body2" color="#fff" mt={1} textAlign="right">
              {journey.completedTasks} / {journey.totalTasks} steps complete
            </Typography>
          </Box>
        </Box>
        <CardContent>
          {todayTask ? (
            <Box>
              <Typography variant="h6" fontWeight={700} color="primary" mb={1}>
                Today's Task
              </Typography>
              <Typography mb={2}>{todayTask.desc}</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Due: {todayTask.due}
              </Typography>
              <Box display="flex" gap={2}>
                <Button variant="contained" color="success" startIcon={<CheckCircleIcon />} sx={{ borderRadius: 3, fontWeight: 700 }}>
                  Mark as Done
                </Button>
                <Button variant="outlined" color="warning" startIcon={<SkipNextIcon />} sx={{ borderRadius: 3, fontWeight: 700 }}>
                  Skip
                </Button>
                <Button variant="outlined" color="info" startIcon={<FeedbackIcon />} sx={{ borderRadius: 3, fontWeight: 700 }}>
                  Feedback
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography>No task for today. Enjoy your progress!</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UnifiedDashboardLayout; 