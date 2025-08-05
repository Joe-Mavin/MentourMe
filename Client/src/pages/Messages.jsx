import React, { useEffect, useState } from 'react';
import API, { sendMessage, fetchMessagesForUser } from '../services/api';
import UnifiedDashboardLayout from '../components/dashboard/UnifiedDashboardLayout';
import {
  Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText, Avatar, MenuItem, Select, InputLabel, FormControl, Badge, Alert
} from '@mui/material';

const MessagesContent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState({ id: '', name: '', role: '' });

  useEffect(() => {
    // Fetch current user from localStorage
    const id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    setCurrentUser({ id, name, role });
    
    // Fetch all users/mentors (excluding admins)
    API.get("/users")
      .then(res => {
        setUsers(res.data.filter(u => u.role !== 'admin'));
      })
      .catch(err => {
        setError('Failed to load users');
        console.error('Error loading users:', err);
      });
  }, []);

  useEffect(() => {
    if (!selectedUserId || !currentUser.id) return;
    setLoading(true);
    setError('');
    
    fetchMessagesForUser(currentUser.id)
      .then(res => {
        // Only show messages between current user and selected user
        setMessages(res.data.filter(m =>
          (m.senderId === currentUser.id && m.receiverId === selectedUserId) ||
          (m.senderId === selectedUserId && m.receiverId === currentUser.id)
        ));
      })
      .catch(err => {
        setError('Failed to load messages');
        console.error('Error loading messages:', err);
      })
      .finally(() => setLoading(false));
  }, [selectedUserId, currentUser.id]);

  const handleSend = async () => {
    if (!messageInput.trim() || !selectedUserId) return;
    
    try {
      await sendMessage(currentUser.id, selectedUserId, messageInput);
      setMessageInput('');
      setError('');
      
      // Refresh messages
      const res = await fetchMessagesForUser(currentUser.id);
      setMessages(res.data.filter(m =>
        (m.senderId === currentUser.id && m.receiverId === selectedUserId) ||
        (m.senderId === selectedUserId && m.receiverId === currentUser.id)
      ));
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight={900} mb={3} color="primary">Messages</Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
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

const Messages = () => {
  const currentUser = localStorage.getItem('name');
  const currentUserRole = localStorage.getItem('role');

  return (
    <UnifiedDashboardLayout
      currentUser={currentUser}
      currentUserRole={currentUserRole}
    >
      <MessagesContent />
    </UnifiedDashboardLayout>
  );
};

export default Messages;
