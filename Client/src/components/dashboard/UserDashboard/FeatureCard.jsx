import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const FeatureCard = ({ feature }) => {
  return (
    <Card sx={{ 
      borderRadius: 4, 
      boxShadow: 2, 
      minHeight: 180, 
      position: 'relative', 
      p: 2, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'flex-start' 
    }}>
      <CardContent sx={{ width: '100%' }}>
        <Typography 
          variant="h5" 
          fontWeight={700} 
          color="primary.main" 
          mb={1} 
          sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' } }}
        >
          {feature.title}
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          mb={2} 
          sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}
        >
          {feature.description}
        </Typography>
        {feature.comingSoon && (
          <Box sx={{ 
            position: 'absolute', 
            top: 16, 
            right: 16, 
            bgcolor: '#fbbf24', 
            color: '#222', 
            px: 2, 
            py: 0.5, 
            borderRadius: 2, 
            fontWeight: 700, 
            fontSize: '0.95rem' 
          }}>
            Coming soon
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default FeatureCard; 