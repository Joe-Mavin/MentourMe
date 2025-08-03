import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  Hidden,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import MentorDashboardContent from './MentorDashboard/MentorDashboardContent';

const drawerWidth = 260;

const MentorUnifiedDashboardLayout = ({ currentUser, currentUserRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 120px)' }}>
            <Typography variant="h5">Messages for Mentors - Coming Soon</Typography>
          </Box>
        );
      
      case '/profile':
      case '/mentor-profile':
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 120px)' }}>
            <Typography variant="h5">Mentor Profile - Coming Soon</Typography>
          </Box>
        );
      
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

export default MentorUnifiedDashboardLayout; 