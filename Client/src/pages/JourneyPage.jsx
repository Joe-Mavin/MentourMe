import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import FeedbackIcon from '@mui/icons-material/Feedback';

const JourneyPage = () => {
  // Mock journey data
  const journey = {
    goal: 'Personal Development',
    startDate: '2024-07-01',
    totalTasks: 7,
    completedTasks: 3,
    tasks: [
      { day: 1, desc: 'Write down your top 3 personal goals.', done: true },
      { day: 2, desc: 'Reflect on a recent challenge and how you handled it.', done: true },
      { day: 3, desc: 'Read a chapter from a self-improvement book.', done: true },
      { day: 4, desc: 'Practice 10 minutes of mindfulness meditation.', done: false, today: true, due: '2024-07-04' },
      { day: 5, desc: 'Reach out to a mentor or peer for advice.', done: false },
      { day: 6, desc: 'Set a new micro-habit for the week.', done: false },
      { day: 7, desc: 'Review your progress and journal your thoughts.', done: false },
    ],
  };
  const todayTask = journey.tasks.find(t => t.today);
  const progress = (journey.completedTasks / journey.totalTasks) * 100;

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="background.default" px={2}>
      <Card sx={{ maxWidth: 500, width: '100%', borderRadius: 4, boxShadow: 6, p: 0, overflow: 'hidden' }}>
        <Box sx={{
          background: 'linear-gradient(90deg, #3a8bfd 0%, #1e40af 100%)',
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <TimelineIcon sx={{ fontSize: 48, color: '#fff', mb: 1 }} />
          <Typography variant="h5" fontWeight={800} color="#fff">
            My Journey: {journey.goal}
          </Typography>
          <Box width="80%" mt={2}>
            <Box sx={{ height: 10, bgcolor: '#1e2a78', borderRadius: 5, overflow: 'hidden' }}>
              <Box sx={{ width: `${progress}%`, height: '100%', bgcolor: '#3a8bfd', transition: 'width 0.5s' }} />
            </Box>
            <Typography variant="body2" color="#fff" mt={1} textAlign="right">
              {journey.completedTasks} / {journey.totalTasks} steps complete
            </Typography>
          </Box>
        </Box>
        <CardContent>
          {todayTask ? (
            <Box>
              <Typography variant="h6" fontWeight={700} color="primary" mb={1}>
                Today's Task
              </Typography>
              <Typography mb={2}>{todayTask.desc}</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Due: {todayTask.due}
              </Typography>
              <Box display="flex" gap={2}>
                <Button variant="contained" color="success" startIcon={<CheckCircleIcon />} sx={{ borderRadius: 3, fontWeight: 700 }}>
                  Mark as Done
                </Button>
                <Button variant="outlined" color="warning" startIcon={<SkipNextIcon />} sx={{ borderRadius: 3, fontWeight: 700 }}>
                  Skip
                </Button>
                <Button variant="outlined" color="info" startIcon={<FeedbackIcon />} sx={{ borderRadius: 3, fontWeight: 700 }}>
                  Feedback
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography>No task for today. Enjoy your progress!</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default JourneyPage; 