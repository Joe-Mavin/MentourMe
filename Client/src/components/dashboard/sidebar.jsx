import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
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
    <Box
      sx={{
        bgcolor: theme.palette.primary.main, // Background color for Sidebar
        border: "2px solid #fff", // Sidebar border
        width: "250px", // Sidebar width
        height: "100vh", // Full height for sidebar
        position: "relative", // Allows child elements to use absolute positioning
        paddingTop: "24px", // Adjust top padding for content
      }}
    >
      {/* Sidebar Header with Gradient Text Effect */}
      <Typography
        sx={{
          padding: "16px",
          fontFamily: theme.typography.fontFamily,
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "100%",
          letterSpacing: 7,
          background:
            "linear-gradient(to right, #FFFFFF 50%, rgba(117, 122, 140, 0.5) 75%, rgba(117, 122, 140, 0) 100%)", // Gradual fade from TOUR to ME
          WebkitBackgroundClip: "text", // Clip gradient to text
          WebkitTextFillColor: "transparent", // Transparent fill to reveal gradient
          color: "transparent", // Fallback
        }}
      >
        MENTOURME
      </Typography>

      {/* Sharp-edged, thick-in-middle Vector Line */}
      <Box
        sx={{
          position: "absolute", // Positioned relative to Sidebar
          top: "91.5px", // Distance from the top
          left: "25px", // Distance from the left
          width: "calc(100% - 50px)", // Adjusts width respecting left & right margins
          height: "1px", // Thicker middle for the line
          background:
            "linear-gradient(to right, transparent, #E0E1E2, transparent)", // Gradient effect
          borderRadius: "2px", // Sharp but slightly rounded edges
        }}
      />

      {/* Sidebar Items */}
      <SidebarItem icon={<HouseIcon />} label="Dashboard" />
      <SidebarItem icon={<ConnectWithoutContactIcon />} label="Connect" />
      <SidebarItem icon={<SmartToyIcon />} label="Bot" route="/onboard"/>
      <SidebarItem icon={<PersonIcon />} label="Profile" />
      <SidebarItem icon={<SettingsIcon />} label="Settings" />
      <SidebarItem icon={<ContactEmergencyIcon />} label="Mentor" />
      <SidebarItem icon={<Diversity1Icon  />} label="Peers" />
    </Box>
  );
};

export default Sidebar;
