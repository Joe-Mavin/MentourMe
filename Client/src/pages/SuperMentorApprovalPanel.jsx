import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Button, Avatar, Chip, CircularProgress, Stack } from '@mui/material';

const SuperMentorApprovalPanel = () => {
  const [pendingMentors, setPendingMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingMentors();
  }, []);

  const fetchPendingMentors = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/users/admin/pending-mentors');
      setPendingMentors(res.data);
    } catch (err) {
      setError('Failed to load pending mentors.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await axios.post(`/api/users/admin/approve-mentor/${userId}`);
      fetchPendingMentors();
    } catch {
      setError('Failed to approve mentor.');
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.post(`/api/users/admin/reject-mentor/${userId}`);
      fetchPendingMentors();
    } catch {
      setError('Failed to reject mentor.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f3f4f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: 800, width: '100%', mt: 6, p: 3 }}>
        <Typography variant="h4" fontWeight={900} mb={4} color="#1f2937">Mentor Approval Panel</Typography>
        <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 4 }}>
          <Typography variant="h6" mb={2}>Pending Mentor Applications</Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px"><CircularProgress /></Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : pendingMentors.length === 0 ? (
            <Typography color="text.secondary">No pending mentor applications.</Typography>
          ) : (
            <Stack spacing={3}>
              {pendingMentors.map(mentor => (
                <Paper key={mentor.id} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Avatar src={mentor.profilePicture} sx={{ width: 56, height: 56 }} />
                  <Box flex={1}>
                    <Typography fontWeight={700}>{mentor.name}</Typography>
                    <Typography color="text.secondary">{mentor.email}</Typography>
                    <Chip label={mentor.role} color="primary" size="small" sx={{ mt: 1 }} />
                  </Box>
                  <Button variant="contained" color="success" onClick={() => handleApprove(mentor.id)} sx={{ mr: 1 }}>Approve</Button>
                  <Button variant="outlined" color="error" onClick={() => handleReject(mentor.id)}>Reject</Button>
                </Paper>
              ))}
            </Stack>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default SuperMentorApprovalPanel; 