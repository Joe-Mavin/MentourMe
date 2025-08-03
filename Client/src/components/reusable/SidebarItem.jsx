import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon, label, route, onClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = route && location.pathname === route;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (route) {
      navigate(route);
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
        color: isActive ? 'white' : '#FFFFFF',
        textTransform: 'none',
        backgroundColor: isActive ? '#E0E1E2' : 'transparent',
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
          backgroundColor: isActive ? '#0075FF' : '#1A1F37',
          color: isActive ? 'white' : 'blue',
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
