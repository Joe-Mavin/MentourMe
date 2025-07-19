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
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import axios from 'axios';
import { ENDPOINTS } from '../config/environment';

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

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="background.default" px={2}>
      <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 4, boxShadow: 3, p: { xs: 1, sm: 2 } }}>
        <CardContent>
          <Typography variant="h4" fontWeight={800} color="primary" mb={2} textAlign="center">
            Profile
          </Typography>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          {user && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography><strong>Name:</strong> {user.name}</Typography>
              <Typography><strong>Email:</strong> {user.email}</Typography>
              <Typography><strong>Phone:</strong> {user.phone}</Typography>
              <Typography><strong>Onboarded:</strong> {user.onboarded ? 'Yes' : 'No'}</Typography>
              <Typography variant="body2" color="text.secondary">Joined: {new Date(user.createdAt).toLocaleDateString()}</Typography>
            </Box>
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
