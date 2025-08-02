import React from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';

const JourneyCard = ({ 
  journey, 
  loading, 
  error, 
  generating, 
  progress, 
  onGenerateJourney 
}) => {
  return (
    <Card sx={{ borderRadius: 4, boxShadow: 6, p: 0, overflow: 'hidden', mb: 3 }}>
      <Box sx={{
        background: 'linear-gradient(90deg, #3a8bfd 0%, #1e40af 100%)',
        py: 3,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
      }}>
        <Box sx={{ position: 'relative', width: 80, height: 80 }}>
          <CircularProgress
            variant="determinate"
            value={progress}
            size={80}
            thickness={5}
            sx={{ color: '#fff', position: 'absolute', top: 0, left: 0 }}
            aria-label="Journey progress"
          />
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Typography variant="h6" color="#fff" fontWeight={800}>
              {Math.round(progress)}%
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" color="#fff" fontWeight={800}>
            My Journey
          </Typography>
          <Typography color="#e0e7ef" fontSize={14}>
            Goal: {journey ? journey.goal : '-'}
          </Typography>
          <Typography color="#e0e7ef" fontSize={14}>
            Points: <b>{journey ? journey.points : 0}</b>
          </Typography>
        </Box>
      </Box>
      <CardContent>
        {loading ? (
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress size={24} color="primary" />
            <Typography>Loading journey...</Typography>
          </Box>
        ) : error && !journey ? (
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Typography color="error" textAlign="center">{error}</Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 3, fontWeight: 700, minWidth: 180 }}
              onClick={onGenerateJourney}
              disabled={generating}
            >
              {generating ? 'Creating...' : 'Start My Journey'}
            </Button>
          </Box>
        ) : !journey ? (
          <Typography>No journey available.</Typography>
        ) : (
          <Typography>Journey in progress...</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default JourneyCard; 