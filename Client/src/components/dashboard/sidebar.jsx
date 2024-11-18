import React from "react";
import { Box, Typography } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      sx={{
        bgcolor: "#1A1F37", // Background color for Sidebar
        border: "2px solid #fff", // Sidebar border
        width: "250px", // Sidebar width
        height: "100vh", // Full height for sidebar
        position: "relative", // Allows child elements to use absolute positioning
      }}
    >
      {/* Sidebar Content */}
      <Typography
        sx={{
          padding: "16px",
          color: "white",
          fontFamily: "Plus Jakarta Display, sans-serif",
          fontWeight: 500,
        }}
      >
        MentourMe
      </Typography>

      {/* Sharp-edged, thick-in-middle Vector Line */}
      <Box
        sx={{
          position: "absolute", // Positioned relative to Sidebar
          top: "91.5px", // Distance from the top
          left: "25px", // Distance from the left
          width: "calc(100% - 50px)", // Adjusts width respecting left & right margins
          height: "1px", // Line thickness
          background: "linear-gradient(to right, transparent, #E0E1E2, transparent)", // Gradient effect
          borderRadius: "2px", // Sharp but slightly rounded edges
        }}
      />
    </Box>
  );
};

export default Sidebar;
