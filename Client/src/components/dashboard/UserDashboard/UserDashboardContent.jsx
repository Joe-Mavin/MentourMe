import React from 'react';
import { Grid } from '@mui/material';
import JourneyCard from './JourneyCard';
import LeaderboardCard from './LeaderboardCard';
import FeatureCard from './FeatureCard';

const features = [
  {
    title: 'Mentorship Matching',
    description: 'Get matched with mentors who align with your goals and interests.',
    comingSoon: true,
  },
  {
    title: 'Personal Progress',
    description: 'Track your growth and achievements over time.',
    comingSoon: true,
  },
  {
    title: 'Peer Community',
    description: 'Connect and grow with a brotherhood of achievers.',
    comingSoon: true,
  },
  {
    title: 'Onboarding Bot',
    description: 'Your personalized journey has begun! Explore your dashboard and get started.',
    comingSoon: false,
  },
];

const UserDashboardContent = ({ 
  journeyData, 
  leaderboardData, 
  currentUser 
}) => {
  return (
    <Grid container spacing={4} sx={{ mt: 4 }}>
      <Grid item xs={12} md={6}>
        <JourneyCard 
          journey={journeyData.journey}
          loading={journeyData.loading}
          error={journeyData.error}
          generating={journeyData.generating}
          progress={journeyData.progress}
          onGenerateJourney={journeyData.generateJourney}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <LeaderboardCard 
          leaderboard={leaderboardData.leaderboard}
          loading={leaderboardData.loading}
          currentUser={currentUser}
        />
      </Grid>

      {/* Feature Cards */}
      {features.map((feature) => (
        <Grid item xs={12} sm={6} md={4} key={feature.title}>
          <FeatureCard feature={feature} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserDashboardContent; 