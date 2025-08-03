import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarItem from '../reusable/SidebarItem';
import HouseIcon from '@mui/icons-material/House';
import MessageIcon from '@mui/icons-material/Message';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import TimelineIcon from '@mui/icons-material/Timeline';

const Sidebar = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      bgcolor: '#1A1F37',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      p: 2,
    }}>
      {/* Logo/Brand */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h6" fontWeight={700} color="#3A8BFD">
          MentourMe
        </Typography>
      </Box>

      {/* Navigation Items */}
      <Box sx={{ width: '100%', flex: 1 }}>
        <SidebarItem icon={<HouseIcon />} label="Dashboard" route="/dashboard" />
        <Box>
          <SidebarItem icon={<MessageIcon />} label="Messages" route="/messages" />
          <SidebarItem icon={<SmartToyIcon />} label="Bot" route="/bot" />
          <SidebarItem icon={<PersonIcon />} label="Profile" route="/profile" />
          <SidebarItem icon={<TimelineIcon />} label="Journey" route="/journey" />
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ mt: 'auto', textAlign: 'center' }}>
        <Typography variant="caption" color="#666">
          © 2024 MentourMe
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
