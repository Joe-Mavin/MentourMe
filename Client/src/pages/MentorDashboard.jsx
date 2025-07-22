import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "/api/mentorship";

export default function MentorDashboard() {
  const [profile, setProfile] = useState(null);
  const [mentees, setMentees] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Fetch mentor profile (assume /api/users/profile returns current user)
    axios.get("/api/users/profile", { withCredentials: true })
      .then(res => setProfile(res.data.user))
      .catch(() => setProfile(null));

    // Fetch mentees
    axios.get(`${API_BASE}/mentor-dashboard`, { withCredentials: true })
      .then(res => setMentees(res.data.mentees || []))
      .catch(() => setMentees([]));

    // Fetch specializations
    axios.get(`${API_BASE}/specializations`)
      .then(res => setSpecializations(res.data))
      .catch(() => setSpecializations([]));
  }, []);

  const filteredMentees = mentees.filter(m =>
    m.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h2>Mentor Dashboard</h2>
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
          placeholder="Filter mentees by name..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ padding: 8, width: 300 }}
        />
      </div>

      <h4>Mentees</h4>
      <ul>
        {filteredMentees.length === 0 ? (
          <li>No mentees found.</li>
        ) : (
          filteredMentees.map(m => (
            <li key={m.id}>
              <b>{m.name}</b> ({m.email}) {m.phone && <>- {m.phone}</>}
            </li>
          ))
        )}
      </ul>
    </div>
  );
} 