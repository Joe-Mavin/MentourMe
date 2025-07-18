import React from 'react'
import Sidebar from '../components/dashboard/sidebar'
import { Box, Typography, Card, CardContent, Grid, useTheme } from '@mui/material'

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
]

const UserDashboard = () => {
  const theme = useTheme();
  return (
    <Box display="flex" minHeight="100vh" bgcolor={theme.palette.background.default}>
      {/* Sidebar: visible on all sizes for now, can be made collapsible for mobile in future */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Sidebar />
      </Box>
      <Box flex={1} p={{ xs: 1, sm: 2, md: 4 }} width="100%">
        <Card sx={{ mb: 4, borderRadius: 4, boxShadow: 3, background: 'linear-gradient(90deg, #3a8bfd 0%, #1e40af 100%)' }}>
          <CardContent>
            <Typography variant="h3" fontWeight={800} color="#fff" mb={1} sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              Welcome to MentourMe
            </Typography>
            <Typography variant="h6" color="#e0e7ef" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Your journey to greatness starts here. Explore your dashboard and unlock your full potential.
            </Typography>
          </CardContent>
        </Card>
        <Grid container spacing={3}>
          {features.map((feature, idx) => (
            <Grid item xs={12} md={6} key={feature.title}>
              <Card sx={{ borderRadius: 4, boxShadow: 2, minHeight: 160, position: 'relative', p: 2 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight={700} color="primary.main" mb={1} sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mb={2} sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>
                    {feature.description}
                  </Typography>
                  {feature.comingSoon && (
                    <Box sx={{ position: 'absolute', top: 16, right: 16, bgcolor: '#fbbf24', color: '#222', px: 2, py: 0.5, borderRadius: 2, fontWeight: 700, fontSize: '0.95rem' }}>
                      Coming soon
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default UserDashboard
