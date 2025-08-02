import React from 'react';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const LeaderboardCard = ({ leaderboard, loading, currentUser }) => {
  return (
    <Card sx={{ borderRadius: 4, boxShadow: 6, p: 0, overflow: 'hidden', mb: 3 }}>
      <Box sx={{
        background: 'linear-gradient(90deg, #fbbf24 0%, #f59e42 100%)',
        py: 3,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}>
        <EmojiEventsIcon sx={{ fontSize: 40, color: '#fff' }} />
        <Typography variant="h6" color="#fff" fontWeight={800}>
          Leaderboard
        </Typography>
      </Box>
      <CardContent>
        {loading ? (
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress size={24} color="primary" />
            <Typography>Loading leaderboard...</Typography>
          </Box>
        ) : leaderboard.length === 0 ? (
          <Typography>No leaderboard data yet.</Typography>
        ) : (
          leaderboard.slice(0, 5).map((user, idx) => {
            // Highlight current user
            const isCurrentUser = currentUser && user.name === currentUser;
            return (
              <Box key={user.name} display="flex" alignItems="center" gap={2} mb={1} sx={{ bgcolor: isCurrentUser ? 'primary.light' : 'transparent', borderRadius: 2, px: 1 }}>
                <Typography fontWeight={700} color={isCurrentUser ? 'primary' : 'text.primary'}>
                  {idx + 1}.
                </Typography>
                <Typography fontWeight={700} color={isCurrentUser ? 'primary' : 'text.primary'}>
                  {user.name}
                </Typography>
                <Typography color="text.secondary">Points: {user.points}</Typography>
                <Typography color="text.secondary">Milestones: {user.milestones}</Typography>
                {isCurrentUser && <EmojiEventsIcon color="primary" fontSize="small" sx={{ ml: 1 }} />}
              </Box>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard; 