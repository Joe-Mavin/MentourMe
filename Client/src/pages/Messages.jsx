import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText, Avatar, MenuItem, Select, InputLabel, FormControl, Badge
} from '@mui/material';

const API_BASE = '/api';

const Messages = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: '', name: '', role: '' });

  useEffect(() => {
    // Fetch current user from localStorage
    const id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    setCurrentUser({ id, name, role });
    // Fetch all users/mentors (excluding admins)
    axios.get(`${API_BASE}/users`)
      .then(res => {
        setUsers(res.data.filter(u => u.role !== 'admin'));
      });
  }, []);

  useEffect(() => {
    if (!selectedUserId || !currentUser.id) return;
    setLoading(true);
    axios.get(`${API_BASE}/messages/${currentUser.id}`)
      .then(res => {
        // Only show messages between current user and selected user
        setMessages(res.data.filter(m =>
          (m.senderId === currentUser.id && m.receiverId === selectedUserId) ||
          (m.senderId === selectedUserId && m.receiverId === currentUser.id)
        ));
      })
      .finally(() => setLoading(false));
  }, [selectedUserId, currentUser.id]);

  const handleSend = async () => {
    if (!messageInput.trim() || !selectedUserId) return;
    await axios.post(`${API_BASE}/messages`, {
      senderId: currentUser.id,
      receiverId: selectedUserId,
      content: messageInput
    });
    setMessageInput('');
    // Refresh messages
    axios.get(`${API_BASE}/messages/${currentUser.id}`)
      .then(res => {
        setMessages(res.data.filter(m =>
          (m.senderId === currentUser.id && m.receiverId === selectedUserId) ||
          (m.senderId === selectedUserId && m.receiverId === currentUser.id)
        ));
      });
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight={900} mb={3} color="primary">Messages</Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select User/Mentor</InputLabel>
          <Select
            value={selectedUserId}
            label="Select User/Mentor"
            onChange={e => setSelectedUserId(e.target.value)}
          >
            {users.filter(u => u.id !== currentUser.id).map(user => (
              <MenuItem key={user.id} value={user.id}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar src={user.profilePicture} />
                  <span>{user.name} ({user.role})</span>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Paper variant="outlined" sx={{ minHeight: 300, maxHeight: 400, overflowY: 'auto', mb: 2, p: 2 }}>
          <List>
            {loading ? <Typography>Loading...</Typography> :
              messages.length === 0 ? <Typography color="text.secondary">No messages yet.</Typography> :
                messages.map(msg => (
                  <ListItem key={msg.id} alignItems={msg.senderId === currentUser.id ? 'right' : 'left'}>
                    <Avatar src={msg.sender?.profilePicture} sx={{ mr: 2 }} />
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography fontWeight={msg.isRead ? 400 : 700} color={msg.senderId === currentUser.id ? 'primary' : 'text.primary'}>
                            {msg.content}
                          </Typography>
                          {!msg.isRead && msg.receiverId === currentUser.id && (
                            <Badge color="secondary" variant="dot">Unread</Badge>
                          )}
                        </Box>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {msg.sender?.name} • {new Date(msg.createdAt).toLocaleString()}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
          </List>
        </Paper>
        <Box display="flex" gap={2}>
          <TextField
            fullWidth
            label="Type your message..."
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          />
          <Button variant="contained" color="primary" onClick={handleSend} disabled={!selectedUserId || !messageInput.trim()}>
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Messages;
