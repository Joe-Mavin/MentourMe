import React, { useState } from 'react';
import { Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import DashboardLayout from '../components/dashboard/UserDashboard/DashboardLayout';
import UserDashboardContent from '../components/dashboard/UserDashboard/UserDashboardContent';
import { useJourney } from '../hooks/useJourney';
import { useLeaderboard } from '../hooks/useLeaderboard';

const UserDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Get current user name and role from localStorage
  const currentUser = localStorage.getItem('name');
  const currentUserRole = localStorage.getItem('role');

  // Custom hooks for data management
  const journeyData = useJourney();
  const leaderboardData = useLeaderboard();

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

  return (
    <DashboardLayout
      currentUser={currentUser}
      currentUserRole={currentUserRole}
      mobileOpen={mobileOpen}
      onDrawerToggle={handleDrawerToggle}
    >
      <UserDashboardContent
        journeyData={{
          ...journeyData,
          generateJourney: handleGenerateJourney,
        }}
        leaderboardData={leaderboardData}
        currentUser={currentUser}
      />
      
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
    </DashboardLayout>
  );
};

export default UserDashboard;
