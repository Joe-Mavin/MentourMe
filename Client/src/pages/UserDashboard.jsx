import React from 'react'
import Sidebar from '../components/dashboard/sidebar'
import { Box, Typography, Card, CardContent, Grid } from '@mui/material'

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
  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f7f9fb">
      <Sidebar />
      <Box flex={1} p={4}>
        <Card sx={{ mb: 4, borderRadius: 4, boxShadow: 3, background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)' }}>
          <CardContent>
            <Typography variant="h3" fontWeight={800} color="#fff" mb={1}>
              Welcome to MentourMe
            </Typography>
            <Typography variant="h6" color="#e0e7ef">
              Your journey to greatness starts here. Explore your dashboard and unlock your full potential.
            </Typography>
          </CardContent>
        </Card>
        <Grid container spacing={3}>
          {features.map((feature, idx) => (
            <Grid item xs={12} md={6} key={feature.title}>
              <Card sx={{ borderRadius: 4, boxShadow: 2, minHeight: 160, position: 'relative', p: 2 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight={700} color="primary.main" mb={1}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mb={2}>
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
