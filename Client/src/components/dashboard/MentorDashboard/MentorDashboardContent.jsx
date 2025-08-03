import React, { useEffect, useState } from "react";
import API from "../../services/api";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  Chip,
  Divider,
  Badge,
  TextField
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import EventIcon from '@mui/icons-material/Event';

const API_BASE = "/api/mentorship";

export default function MentorDashboardContent() {
  const [profile, setProfile] = useState(null);
  const [mentees, setMentees] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    API.get("/api/users/profile")
      .then(res => setProfile(res.data.user))
      .catch(() => setProfile(null));
    API.get(`${API_BASE}/mentor-dashboard`)
      .then(res => setMentees(res.data.mentees || []))
      .catch(() => setMentees([]));
    API.get(`${API_BASE}/specializations`)
      .then(res => setSpecializations(res.data))
      .catch(() => setSpecializations([]));
  }, []);

  const filteredMentees = mentees.filter(m =>
    m.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 1100, margin: '0 auto' }}>
      <Typography variant="h3" fontWeight={900} color="primary" mb={3} textAlign="center">
        Mentor Dashboard
      </Typography>
      {/* Profile Section */}
      <Card sx={{ mb: 4, borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={2} textAlign="center">
              <Avatar
                src={profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || 'Mentor')}`}
                alt="Profile"
                sx={{ width: 100, height: 100, mx: "auto", mb: 2, fontSize: 40 }}
              >
                <PersonIcon fontSize="large" />
              </Avatar>
              <Chip label="Mentor" color="primary" sx={{ mt: 1 }} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h5" fontWeight={800}>{profile?.name}</Typography>
              <Typography color="text.secondary" mb={1}>{profile?.email}</Typography>
              <Typography variant="body1" mb={1}><b>Bio:</b> {profile?.bio || "No bio provided."}</Typography>
              <Typography variant="body1" mb={1}><b>Qualifications:</b> <span style={{ color: '#888' }}>Coming Soon</span></Typography>
              <Typography variant="body1" mb={1}><b>Mentor Type:</b> <span style={{ color: '#888' }}>Coming Soon</span></Typography>
              <Typography variant="body1" mb={1}><b>Specializations:</b> {profile?.specializations?.map(s => s.name).join(", ") || "None"}</Typography>
            </Grid>
            <Grid item xs={12} md={3} textAlign="center">
              <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <StarIcon color="warning" />
                  <Typography fontWeight={700} color="primary.main">4.8</Typography>
                  <Typography color="text.secondary">(Avg. Rating)</Typography>
                  <Chip label="Coming Soon" color="warning" size="small" sx={{ ml: 1 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  <b>What mentees say:</b> <span style={{ color: '#888' }}>Coming Soon</span>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Mentees List Section */}
      <Card sx={{ mb: 4, borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" fontWeight={800} color="primary">My Mentees</Typography>
            <TextField
              label="Filter by name"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              size="small"
              sx={{ width: 250 }}
            />
          </Box>
          <Divider sx={{ mb: 2 }} />
          {filteredMentees.length === 0 ? (
            <Typography color="text.secondary">No mentees found.</Typography>
          ) : (
            <Grid container spacing={2}>
              {filteredMentees.map(m => (
                <Grid item xs={12} md={6} key={m.id}>
                  <Card sx={{ borderRadius: 3, boxShadow: 1, mb: 2 }}>
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar src={`https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}`} alt={m.name} />
                        <Box flex={1}>
                          <Typography fontWeight={700}>{m.name}</Typography>
                          <Typography color="text.secondary" fontSize={14}>{m.email}</Typography>
                        </Box>
                        <Chip label="Active" color="success" size="small" />
                      </Box>
                      <Box display="flex" gap={2} mt={2}>
                        <Badge badgeContent={<Chip label="Coming Soon" color="warning" size="small" />} color="default">
                          <Button variant="outlined" color="primary" startIcon={<MessageIcon />} disabled>
                            Message
                          </Button>
                        </Badge>
                        <Badge badgeContent={<Chip label="Coming Soon" color="warning" size="small" />} color="default">
                          <Button variant="outlined" color="secondary" startIcon={<EventIcon />} disabled>
                            Schedule Meeting
                          </Button>
                        </Badge>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Testimonials & Ratings Section */}
      <Card sx={{ borderRadius: 4, boxShadow: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={800} color="primary" mb={2}>
            Testimonials & Ratings <Chip label="Coming Soon" color="warning" size="small" />
          </Typography>
          <Typography color="text.secondary">This section will display feedback and ratings from your mentees.</Typography>
        </CardContent>
      </Card>
    </Box>
  );
} 