import React from "react";
import { Box, Typography, useTheme, Paper } from "@mui/material";
import SidebarItem from "../reusable/SidebarItem";
import HouseIcon from "@mui/icons-material/House";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

const Sidebar = () => {
  const theme = useTheme();

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
          fontWeight: 800,
          letterSpacing: 2,
          color: theme.palette.primary.main,
          mb: 4,
          fontFamily: 'Plus Jakarta Display, Inter, sans-serif',
        }}
      >
        Mahood
      </Typography>

      {/* Sidebar Items */}
      <Box sx={{ width: '100%', flex: 1 }}>
        <SidebarItem icon={<HouseIcon />} label="Dashboard" />
        <SidebarItem icon={<ConnectWithoutContactIcon />} label="Connect" />
        <SidebarItem icon={<SmartToyIcon />} label="Bot" route="/onboard"/>
        <SidebarItem icon={<PersonIcon />} label="Profile" />
        <SidebarItem icon={<SettingsIcon />} label="Settings" />
        <SidebarItem icon={<ContactEmergencyIcon />} label="Mentor" />
        <SidebarItem icon={<Diversity1Icon  />} label="Peers" />
      </Box>

      {/* Footer or version info (optional) */}
      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: 4 }}>
        &copy; {new Date().getFullYear()} Mahood
      </Typography>
    </Paper>
  );
};

export default Sidebar;
