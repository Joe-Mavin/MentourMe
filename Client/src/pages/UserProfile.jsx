import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Avatar, Typography, Button, Paper, Chip, CircularProgress } from '@mui/material';
import Sidebar from '../components/dashboard/sidebar';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/users/${id}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.user);
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>;
  if (!profile) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><Typography>User not found</Typography></Box>;

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flex: 1, maxWidth: 600, mx: 'auto', mt: 6, p: 3 }}>
        <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 4 }}>
          <Box display="flex" alignItems="center" gap={3} mb={2}>
            <Avatar src={profile.profilePicture} sx={{ width: 80, height: 80 }} />
            <Box>
              <Typography variant="h5" fontWeight={800}>{profile.name}</Typography>
              <Typography color="text.secondary">{profile.email}</Typography>
              <Chip label={profile.role} color={profile.role === 'mentor' ? 'primary' : 'default'} sx={{ mt: 1 }} />
            </Box>
          </Box>
          <Typography variant="body1" mb={2}><b>Bio:</b> {profile.bio || 'No bio provided.'}</Typography>
          <Typography variant="body1" mb={2}><b>Specializations:</b> {profile.specializations?.map(s => s.name).join(', ') || 'None'}</Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/messages')}>
            Message
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserProfile; 