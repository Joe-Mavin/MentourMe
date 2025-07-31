import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from '../components/dashboard/sidebar';
import { Box } from "@mui/material";

const API_BASE = "/api/mentorship";

export default function TherapistDashboard() {
  const [profile, setProfile] = useState(null);
  const [clients, setClients] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Fetch therapist profile (assume /api/users/profile returns current user)
    axios.get("/api/users/profile", { withCredentials: true })
      .then(res => setProfile(res.data.user))
      .catch(() => setProfile(null));

    // Fetch clients
    axios.get(`${API_BASE}/therapist-dashboard`, { withCredentials: true })
      .then(res => setClients(res.data.clients || []))
      .catch(() => setClients([]));

    // Fetch specializations
    axios.get(`${API_BASE}/specializations`)
      .then(res => setSpecializations(res.data))
      .catch(() => setSpecializations([]));
  }, []);

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flex: 1, maxWidth: 900, margin: '0 auto', padding: 3 }}>
        <h2>Therapist Dashboard</h2>
        {profile && (
          <div style={{ marginBottom: 24, padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
            <img
              src={profile.profilePicture || "https://ui-avatars.com/api/?name=" + encodeURIComponent(profile.name)}
              alt="Profile"
              style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", marginRight: 16 }}
            />
            <div>
              <h3>{profile.name}</h3>
              <p><b>Bio:</b> {profile.bio || "No bio provided."}</p>
              <p><b>Specializations:</b> {profile.specializations?.map(s => s.name).join(", ") || "None"}</p>
            </div>
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Filter clients by name..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ padding: 8, width: 300 }}
          />
        </div>

        <h4>Clients</h4>
        <ul>
          {filteredClients.length === 0 ? (
            <li>No clients found.</li>
          ) : (
            filteredClients.map(c => (
              <li key={c.id}>
                <b>{c.name}</b> ({c.email}) {c.phone && <>- {c.phone}</>}
              </li>
            ))
          )}
        </ul>
      </Box>
    </Box>
  );
} 