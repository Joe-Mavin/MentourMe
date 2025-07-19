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
import CircularProgress from '@mui/material/CircularProgress';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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

const mockJourney = {
  goal: 'Personal Development',
  startDate: '2024-07-01',
  totalTasks: 7,
  completedTasks: 3,
  points: 120,
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
const todayTask = mockJourney.tasks.find(t => t.today);
const progress = (mockJourney.completedTasks / mockJourney.totalTasks) * 100;

const mockLeaderboard = [
  { name: 'Alice', points: 180, milestones: 4 },
  { name: 'You', points: 120, milestones: 3 },
  { name: 'Bob', points: 90, milestones: 2 },
  { name: 'Carol', points: 60, milestones: 1 },
];

const UserDashboard = () => {
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [journey, setJourney] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskActionLoading, setTaskActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchJourney = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(ENDPOINTS.BOT.JOURNEY, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJourney(res.data.journey);
    } catch (err) {
      setJourney(null);
      setError('No journey found. Please complete onboarding or generate a journey.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(ENDPOINTS.BOT.LEADERBOARD, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaderboard(res.data.leaderboard);
    } catch (err) {
      setLeaderboard([]);
      setError('Failed to load leaderboard');
    }
  };

  useEffect(() => {
    fetchJourney();
    fetchLeaderboard();
    // eslint-disable-next-line
  }, []);

  const handleTaskAction = async (taskId, action) => {
    setTaskActionLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const url = action === 'done' ? ENDPOINTS.BOT.COMPLETE_TASK(taskId) : ENDPOINTS.BOT.SKIP_TASK(taskId);
      await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchJourney(); // Refresh journey after action
      await fetchLeaderboard(); // Refresh leaderboard
      setSnackbar({
        open: true,
        message: action === 'done' ? 'Task marked as done! 🎉' : 'Task skipped.',
        severity: action === 'done' ? 'success' : 'info',
      });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to update task', severity: 'error' });
    } finally {
      setTaskActionLoading(false);
    }
  };

  // Find today's task (first pending task)
  let todayTask = null;
  if (journey && journey.tasks && journey.tasks.length > 0) {
    todayTask = journey.tasks.find(t => t.status === 'pending');
  }
  const progress = journey ? (journey.completedTasks / journey.totalTasks) * 100 : 0;

  // Get current user name from localStorage (if available)
  const currentUser = localStorage.getItem('name');

  // Snackbar close handler
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      {/* AppBar for mobile */}
      <Hidden mdUp>
        <AppBar position="fixed" color="transparent" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2 }} aria-label="Open sidebar menu">
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
          onClose={() => setMobileOpen(false)}
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {/* My Journey Card */}
              <Card sx={{ borderRadius: 4, boxShadow: 6, p: 0, overflow: 'hidden', mb: 3 }}>
                <Box sx={{
                  background: 'linear-gradient(90deg, #3a8bfd 0%, #1e40af 100%)',
                  py: 3,
                  px: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                }}>
                  <Box sx={{ position: 'relative', width: 80, height: 80 }}>
                    <CircularProgress
                      variant="determinate"
                      value={progress}
                      size={80}
                      thickness={5}
                      sx={{ color: '#fff', position: 'absolute', top: 0, left: 0 }}
                      aria-label="Journey progress"
                    />
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Typography variant="h6" color="#fff" fontWeight={800}>
                        {Math.round(progress)}%
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="#fff" fontWeight={800}>
                      My Journey
                    </Typography>
                    <Typography color="#e0e7ef" fontSize={14}>
                      Goal: {journey ? journey.goal : '-'}
                    </Typography>
                    <Typography color="#e0e7ef" fontSize={14}>
                      Points: <b>{journey ? journey.points : 0}</b>
                    </Typography>
                  </Box>
                </Box>
                <CardContent>
                  {loading ? (
                    <Box display="flex" alignItems="center" gap={2}>
                      <CircularProgress size={24} color="primary" />
                      <Typography>Loading journey...</Typography>
                    </Box>
                  ) : error && !journey ? (
                    <Typography color="error">{error}</Typography>
                  ) : !todayTask && journey ? (
                    <Typography>No task for today. Enjoy your progress!</Typography>
                  ) : todayTask ? (
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700} color="primary" mb={1}>
                        Today’s Task
                      </Typography>
                      <Typography mb={2}>{todayTask.description}</Typography>
                      <Typography variant="body2" color="text.secondary" mb={2}>
                        Due: {todayTask.dueDate}
                      </Typography>
                      <Box display="flex" gap={2}>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircleIcon />}
                          sx={{ borderRadius: 3, fontWeight: 700 }}
                          onClick={() => handleTaskAction(todayTask.id, 'done')}
                          disabled={taskActionLoading}
                          aria-label="Mark task as done"
                        >
                          {taskActionLoading ? 'Processing...' : 'Mark as Done'}
                        </Button>
                        <Button
                          variant="outlined"
                          color="warning"
                          startIcon={<SkipNextIcon />}
                          sx={{ borderRadius: 3, fontWeight: 700 }}
                          onClick={() => handleTaskAction(todayTask.id, 'skip')}
                          disabled={taskActionLoading}
                          aria-label="Skip task"
                        >
                          Skip
                        </Button>
                        {/* Feedback button can be implemented later */}
                        <Button variant="outlined" color="info" startIcon={<FeedbackIcon />} sx={{ borderRadius: 3, fontWeight: 700 }} disabled aria-label="Feedback">
                          Feedback
                        </Button>
                      </Box>
                    </Box>
                  ) : null}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Leaderboard Card */}
              <Card sx={{ borderRadius: 4, boxShadow: 6, p: 0, overflow: 'hidden', mb: 3 }}>
                <Box sx={{
                  background: 'linear-gradient(90deg, #fbbf24 0%, #f59e42 100%)',
                  py: 3,
                  px: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}>
                  <EmojiEventsIcon sx={{ fontSize: 40, color: '#fff' }} />
                  <Typography variant="h6" color="#fff" fontWeight={800}>
                    Leaderboard
                  </Typography>
                </Box>
                <CardContent>
                  {loading ? (
                    <Box display="flex" alignItems="center" gap={2}>
                      <CircularProgress size={24} color="primary" />
                      <Typography>Loading leaderboard...</Typography>
                    </Box>
                  ) : leaderboard.length === 0 ? (
                    <Typography>No leaderboard data yet.</Typography>
                  ) : (
                    leaderboard.map((user, idx) => {
                      // Highlight current user
                      const isCurrentUser = currentUser && user.name === currentUser;
                      return (
                        <Box key={user.name} display="flex" alignItems="center" gap={2} mb={1} sx={{ bgcolor: isCurrentUser ? 'primary.light' : 'transparent', borderRadius: 2, px: 1 }}>
                          <Typography fontWeight={700} color={isCurrentUser ? 'primary' : 'text.primary'}>
                            {idx + 1}.
                          </Typography>
                          <Typography fontWeight={700} color={isCurrentUser ? 'primary' : 'text.primary'}>
                            {user.name}
                          </Typography>
                          <Typography color="text.secondary">Points: {user.points}</Typography>
                          <Typography color="text.secondary">Milestones: {user.milestones}</Typography>
                          {isCurrentUser && <EmojiEventsIcon color="primary" fontSize="small" sx={{ ml: 1 }} />}
                        </Box>
                      );
                    })
                  )}
                </CardContent>
              </Card>
            </Grid>
            {/* Existing features/cards */}
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
        {/* Snackbar for feedback */}
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <MuiAlert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }} elevation={6} variant="filled">
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Box>
  )
}

export default UserDashboard
