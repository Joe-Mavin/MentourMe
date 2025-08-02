import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SidebarItem = ({ icon, label, route }) => {
  const [toggleIcon, setToggleIcon] = useState(false);
  const navigate = useNavigate(); // React Router navigation

  const handleClick = () => {
    setToggleIcon(!toggleIcon); // Toggle state
    if (route) {
      navigate(route); // Navigate to the specified route
    }
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        justifyContent: 'flex-start',
        color: toggleIcon ? 'white' : '#FFFFFF',
        textTransform: 'none',
        backgroundColor: toggleIcon ? '#E0E1E2' : 'transparent',
        '&:hover': {
          backgroundColor: '#E0E1E2',
        },
        borderRadius: '8px',
        width: '219.5px',
        height: '54px',
      }}
    >
      <Box
        sx={{
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: toggleIcon ? '#0075FF' : '#1A1F37',
          color: toggleIcon ? 'white' : 'blue',
          mr: 2,
        }}
      >
        {icon}
      </Box>
      <Typography>{label}</Typography>
    </Button>
  );
};

export default SidebarItem;
