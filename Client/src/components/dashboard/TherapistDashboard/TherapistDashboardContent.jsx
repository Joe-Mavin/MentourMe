import React, { useEffect, useState } from "react";
import API from '../../../services/api';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const API_BASE = "/api/mentorship";

const TherapistDashboardContent = () => {
  const [profile, setProfile] = useState(null);
  const [clients, setClients] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    Promise.all([
      API.get("/users/profile").then(res => setProfile(res.data.user)),
      API.get(`${API_BASE}/therapist-dashboard`).then(res => setClients(res.data.clients || [])),
      API.get(`${API_BASE}/specializations`).then(res => setSpecializations(res.data))
    ]).catch((err) => {
      setError("Failed to load dashboard data. Please check your connection or login status.");
      console.error('Therapist dashboard error:', err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1100, margin: '0 auto' }}>
      <Typography variant="h3" fontWeight={900} color="primary" mb={3} textAlign="center">
        Therapist Dashboard
      </Typography>
      
      {/* Profile Section */}
      <Card sx={{ mb: 4, borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={2} textAlign="center">
              <Avatar
                src={profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || 'Therapist')}`}
                alt="Profile"
                sx={{ width: 100, height: 100, mx: "auto", mb: 2, fontSize: 40 }}
              >
                <PersonIcon fontSize="large" />
              </Avatar>
              <Chip label="Therapist" color="primary" sx={{ mt: 1 }} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h5" fontWeight={800}>{profile?.name}</Typography>
              <Typography color="text.secondary" mb={1}>{profile?.email}</Typography>
              <Typography variant="body1" mb={1}><b>Bio:</b> {profile?.bio || "No bio provided."}</Typography>
              <Typography variant="body1" mb={1}><b>Specializations:</b> {profile?.specializations?.map(s => s.name).join(", ") || "None"}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Clients Section */}
      <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} mb={2}>
            Clients
          </Typography>
          
          <TextField
            fullWidth
            label="Filter clients by name..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            sx={{ mb: 3 }}
          />

          <List>
            {filteredClients.length === 0 ? (
              <ListItem>
                <ListItemText primary="No clients found." />
              </ListItem>
            ) : (
              filteredClients.map(client => (
                <ListItem key={client.id} divider>
                  <ListItemText
                    primary={client.name}
                    secondary={`${client.email}${client.phone ? ` • ${client.phone}` : ''}`}
                  />
                </ListItem>
              ))
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TherapistDashboardContent; 