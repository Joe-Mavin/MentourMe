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
import Sidebar from './sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import MentorDashboardContent from './MentorDashboard/MentorDashboardContent';
import ConversationList from '../messages/ConversationList';
import ChatInterface from '../messages/ChatInterface';
import { useMessages } from '../../hooks/useMessages';
import API from '../../services/api';

const drawerWidth = 260;

const MentorUnifiedDashboardLayout = ({ currentUser, currentUserRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Custom hooks for data management
  const messagesData = useMessages();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Render content based on current route
  const renderContent = () => {
    switch (location.pathname) {
      case '/mentor-dashboard':
        return <MentorDashboardContent />;
      
      case '/messages':
      case '/mentor-messages':
        return (
          <Box sx={{ display: 'flex', height: 'calc(100vh - 120px)' }}>
            {messagesData.loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Typography>Loading messages...</Typography>
              </Box>
            ) : messagesData.error ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'column', gap: 2 }}>
                <Typography color="error">{messagesData.error}</Typography>
                <Button variant="contained" onClick={messagesData.fetchInbox}>
                  Retry
                </Button>
              </Box>
            ) : (
              <>
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
              </>
            )}
          </Box>
        );
      
      case '/profile':
      case '/mentor-profile':
        return <MentorProfileContent />;
      
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
            Welcome, {currentUser || 'Mentor'}!
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
          mt: 8,
          overflow: 'auto',
          bgcolor: 'background.default',
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

// Mentor Profile Content Component
const MentorProfileContent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/users/profile');
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
            {user ? user.name : 'Mentor Profile'}
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
                <Typography><strong>Phone:</strong> {user.phone || 'Not provided'}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                {user.onboarded ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                <Typography><strong>Onboarded:</strong> {user.onboarded ? 'Yes' : 'No'}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircleIcon color="success" />
                <Typography><strong>Role:</strong> Mentor</Typography>
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

export default MentorUnifiedDashboardLayout; 