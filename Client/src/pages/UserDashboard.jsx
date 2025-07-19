import React, { useState, useEffect } from 'react'
import Sidebar from '../components/dashboard/sidebar'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Hidden,
  Button,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import axios from 'axios';
import { ENDPOINTS } from '../config/environment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TimelineIcon from '@mui/icons-material/Timeline';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import FeedbackIcon from '@mui/icons-material/Feedback';

const features = [
  {
    title: 'Mentorship Matching',
    description: 'Get matched with mentors who align with your goals and interests.',
    comingSoon: true,
  },
  {
    title: 'Personal Progress',
    description: 'Track your growth and achievements over time.',
    comingSoon: true,
  },
  {
    title: 'Peer Community',
    description: 'Connect and grow with a brotherhood of achievers.',
    comingSoon: true,
  },
  {
    title: 'Onboarding Bot',
    description: 'Your personalized journey has begun! Explore your dashboard and get started.',
    comingSoon: false,
  },
]

const drawerWidth = 260

export const ProfilePage = () => {
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

export const JourneyPage = () => {
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
                Today’s Task
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

const UserDashboard = () => {
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      {/* AppBar for mobile */}
      <Hidden mdUp>
        <AppBar position="fixed" color="transparent" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" fontWeight={900} color="primary" sx={{ flexGrow: 1, letterSpacing: 2 }}>
              MentourMe
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: theme.palette.background.paper,
            },
          }}
        >
          <Sidebar />
        </Drawer>
      </Hidden>
      {/* Sidebar for desktop */}
      <Hidden mdDown>
        <Box sx={{ width: drawerWidth, flexShrink: 0 }}>
          <Sidebar />
        </Box>
      </Hidden>
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
        {/* Add top spacing for mobile AppBar */}
        <Hidden mdUp>
          <Toolbar />
        </Hidden>
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
          <Card sx={{ mb: 4, borderRadius: 4, boxShadow: 3, background: 'linear-gradient(90deg, #3a8bfd 0%, #1e40af 100%)', maxWidth: 900, mx: 'auto' }}>
            <CardContent>
              <Typography variant="h3" fontWeight={800} color="#fff" mb={1} sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
                Welcome to MentourMe
              </Typography>
              <Typography variant="h6" color="#e0e7ef" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                Your journey to greatness starts here. Explore your dashboard and unlock your full potential.
              </Typography>
            </CardContent>
          </Card>
          <Grid container spacing={3}>
            {features.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={4} key={feature.title}>
                <Card sx={{ borderRadius: 4, boxShadow: 2, minHeight: 180, position: 'relative', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <CardContent sx={{ width: '100%' }}>
                    <Typography variant="h5" fontWeight={700} color="primary.main" mb={1} sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={2} sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>
                      {feature.description}
                    </Typography>
                    {feature.comingSoon && (
                      <Box sx={{ position: 'absolute', top: 16, right: 16, bgcolor: '#fbbf24', color: '#222', px: 2, py: 0.5, borderRadius: 2, fontWeight: 700, fontSize: '0.95rem' }}>
                        Coming soon
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default UserDashboard
