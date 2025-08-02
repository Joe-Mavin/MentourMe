import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Button, Avatar, Chip, CircularProgress, Stack, Divider } from '@mui/material';

const SuperMentorApprovalPanel = () => {
  const [pendingMentors, setPendingMentors] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingMentors, setLoadingMentors] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingMentors();
    fetchUsers();
  }, []);

  const fetchPendingMentors = async () => {
    setLoadingMentors(true);
    setError(null);
    try {
      const res = await axios.get('/api/users/admin/pending-mentors');
      setPendingMentors(res.data);
    } catch (err) {
      setError('Failed to load pending mentors.');
    } finally {
      setLoadingMentors(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setError(null);
    try {
      const res = await axios.get('/api/users/admin/users');
      setUsers(res.data);
    } catch (err) {
      setError('Failed to load users.');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await axios.post(`/api/users/admin/approve-mentor/${userId}`);
      fetchPendingMentors();
      fetchUsers();
    } catch {
      setError('Failed to approve mentor.');
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.post(`/api/users/admin/reject-mentor/${userId}`);
      fetchPendingMentors();
      fetchUsers();
    } catch {
      setError('Failed to reject mentor.');
    }
  };

  const handlePromote = async (userId) => {
    try {
      await axios.post(`/api/users/admin/promote/${userId}`);
      fetchUsers();
    } catch {
      setError('Failed to promote user.');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/users/admin/delete/${userId}`);
      fetchUsers();
      fetchPendingMentors();
    } catch {
      setError('Failed to delete user.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f3f4f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Box sx={{ maxWidth: 900, width: '100%', mt: 6, p: 3 }}>
        <Typography variant="h4" fontWeight={900} mb={4} color="#1f2937">Super Mentor Approval & User Management Panel</Typography>
        <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 4, mb: 4 }}>
          <Typography variant="h6" mb={2}>Pending Mentor Applications</Typography>
          {loadingMentors ? (
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
        <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 4 }}>
          <Typography variant="h6" mb={2}>All Users</Typography>
          {loadingUsers ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px"><CircularProgress /></Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : users.length === 0 ? (
            <Typography color="text.secondary">No users found.</Typography>
          ) : (
            <Stack spacing={2}>
              {users.map(user => (
                <Paper key={user.id} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Avatar sx={{ width: 40, height: 40 }}>{user.name?.[0]}</Avatar>
                  <Box flex={1}>
                    <Typography fontWeight={700}>{user.name}</Typography>
                    <Typography color="text.secondary">{user.email}</Typography>
                    <Chip label={user.role} color={user.role === 'admin' ? 'secondary' : 'primary'} size="small" sx={{ mt: 1 }} />
                    <Chip label={user.status} color={user.status === 'active' ? 'success' : user.status === 'pending' ? 'warning' : 'error'} size="small" sx={{ mt: 1, ml: 1 }} />
                  </Box>
                  {user.role !== 'admin' && (
                    <Button variant="contained" color="secondary" onClick={() => handlePromote(user.id)} sx={{ mr: 1 }}>Promote to Admin</Button>
                  )}
                  <Button variant="outlined" color="error" onClick={() => handleDelete(user.id)}>Delete</Button>
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