import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const SidebarItem = ({ icon, label }) => {
  const [toggleIcon, setToggleIcon] = useState(false);

  // Toggle the state when clicked
  const handleIconToggle = () => {
    setToggleIcon(!toggleIcon);
  };

  return (
    <Button
      onClick={handleIconToggle} // Toggle on click
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        justifyContent: 'flex-start', // Align icon and text
        color: toggleIcon ? 'white' : '#FFFFFF', // Text color adjusts on toggle
        textTransform: 'none', // To prevent text from being capitalized
        backgroundColor: toggleIcon ? '#E0E1E2' : 'transparent', // Gray background when selected
        '&:hover': {
          backgroundColor: '#E0E1E2', // Gray background on hover
        },
        borderRadius: '8px', // Optional: Slightly rounded corners for the button
        width: '219.5px', // Full width for consistent layout
        height: '54px'
      }}
    >
      {/* Icon with rounded background */}
      <Box
        sx={{
          width: '30px', // Box width for the icon
          height: '30px', // Box height for the icon
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%', // Makes the box circular
          backgroundColor: toggleIcon ? '#0075FF' : '#1A1F37', // Blue when selected, dark gray otherwise
          color: toggleIcon ? 'white' : 'blue', // White icon when selected, blue otherwise
          mr: 2, // Spacing between icon and label
        }}
      >
        {icon}
      </Box>
      <Typography>{label}</Typography>
    </Button>
  );
};

export default SidebarItem;
