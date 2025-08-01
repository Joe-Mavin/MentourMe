import React from "react";
import { Box, Typography, useTheme, Paper, Button } from "@mui/material";
import SidebarItem from "../reusable/SidebarItem";
import HouseIcon from "@mui/icons-material/House";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import TimelineIcon from '@mui/icons-material/Timeline';
import ChatIcon from '@mui/icons-material/Chat';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [connectOpen, setConnectOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('onboarded');
    navigate('/login');
  };

  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: theme.palette.background.paper,
        width: 260,
        height: "100vh",
        borderRadius: "24px 0 0 24px",
        boxShadow: '0 8px 32px 0 rgba(37,99,235,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        px: 2,
      }}
    >
      {/* Sidebar Header with Figma-style accent */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          letterSpacing: 2,
          color: '#fff',
          mb: 4,
          fontFamily: 'Plus Jakarta Display, Inter, sans-serif',
          textShadow: '0 0 16px #3a8bfd, 0 2px 8px #1e2a78',
          background: 'linear-gradient(90deg, #3a8bfd 0%, #fff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block',
        }}
      >
        MentourMe
      </Typography>

      {/* Sidebar Items */}
      <Box sx={{ width: '100%', flex: 1 }}>
        <SidebarItem icon={<HouseIcon />} label="Dashboard" />
        <Box>
          <Button
            startIcon={<ConnectWithoutContactIcon />}
            endIcon={<ExpandMoreIcon />}
            onClick={() => setConnectOpen(!connectOpen)}
            sx={{
              width: '100%',
              justifyContent: 'flex-start',
              color: theme.palette.text.primary,
              fontWeight: 700,
              borderRadius: 2,
              mb: 1,
              textTransform: 'none',
              pl: 1.5,
            }}
            aria-label="Connect menu"
          >
            Connect
          </Button>
          {connectOpen && (
            <Box sx={{ pl: 4 }}>
              <SidebarItem icon={<ChatIcon />} label="Messages" route="/messages" />
              {/* Future: <SidebarItem icon={<VideoCallIcon />} label="Video Call" route="/video-call" /> */}
            </Box>
          )}
        </Box>
        <SidebarItem icon={<SmartToyIcon />} label="Bot" route="/onboard"/>
        <SidebarItem icon={<PersonIcon />} label="Profile" route="/profile" />
        <SidebarItem icon={<SettingsIcon />} label="Settings" />
        <SidebarItem icon={<ContactEmergencyIcon />} label="Mentor" />
        <SidebarItem icon={<Diversity1Icon  />} label="Peers" />
      </Box>

      {/* Logout Button */}
      <Box sx={{ width: '100%', mt: 2 }}>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ borderRadius: 3, fontWeight: 700, mb: 2 }}
        >
          Logout
        </Button>
      </Box>

      {/* Footer or version info (optional) */}
      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: 2 }}>
        &copy; {new Date().getFullYear()} MentourMe
      </Typography>
    </Paper>
  );
};

export default Sidebar;
