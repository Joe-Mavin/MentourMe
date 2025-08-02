import React from 'react';
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
import Sidebar from '../sidebar';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 260;

const DashboardLayout = ({ 
  children, 
  currentUser, 
  currentUserRole, 
  mobileOpen, 
  onDrawerToggle 
}) => {
  const navigate = useNavigate();

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
            onClick={onDrawerToggle}
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
          onClose={onDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Sidebar handleDrawerToggle={onDrawerToggle} />
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
          <Sidebar handleDrawerToggle={onDrawerToggle} />
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
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout; 