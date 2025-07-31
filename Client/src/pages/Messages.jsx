import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, TextField, Button, Paper } from '@mui/material';
import Sidebar from '../components/dashboard/sidebar';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const API_BASE = '/api/mentorship/messages';

const Messages = () => {
  const { userId: paramUserId } = useParams();
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchInbox();
  }, []);

  useEffect(() => {
    if (paramUserId && conversations.length > 0) {
      fetchConversation(paramUserId);
    }
    // eslint-disable-next-line
  }, [paramUserId, conversations]);

  const fetchInbox = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_BASE}/inbox`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setConversations(res.data);
  };

  const fetchConversation = async (userId) => {
    setSelectedUser(conversations.find(u => u.id === userId));
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_BASE}/conversation/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(res.data);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    const token = localStorage.getItem('token');
    await axios.post(`${API_BASE}`, {
      receiverId: selectedUser.id,
      content: newMessage,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNewMessage('');
    fetchConversation(selectedUser.id);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: 'flex', height: '100vh' }}>
        <Paper sx={{ width: 320, borderRadius: 0, boxShadow: 2, overflowY: 'auto' }}>
          <Typography variant="h6" sx={{ p: 2 }}>Conversations</Typography>
          <Divider />
          <List>
            {conversations.map(user => (
              <ListItem button key={user.id} selected={selectedUser?.id === user.id} onClick={() => fetchConversation(user.id)}>
                <ListItemAvatar>
                  <Link to={`/profile/${user.id}`} style={{ textDecoration: 'none' }} onClick={e => e.stopPropagation()}>
                    <Avatar src={user.profilePicture} />
                  </Link>
                </ListItemAvatar>
                <ListItemText
                  primary={<Link to={`/profile/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={e => e.stopPropagation()}>{user.name}</Link>}
                  secondary={user.role}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
        <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', height: '100vh' }}>
          {selectedUser ? (
            <>
              <Typography variant="h6" gutterBottom>Chat with {selectedUser.name}</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
                {messages.map(msg => (
                  <Box key={msg.id} sx={{ mb: 1, textAlign: msg.senderId === localStorage.getItem('userId') ? 'right' : 'left' }}>
                    <Paper sx={{ display: 'inline-block', p: 1.5, bgcolor: msg.senderId === localStorage.getItem('userId') ? 'primary.light' : 'grey.100' }}>
                      <Typography variant="body2">{msg.content}</Typography>
                      <Typography variant="caption" color="text.secondary">{new Date(msg.createdAt).toLocaleString()}</Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                />
                <Button variant="contained" onClick={handleSend}>Send</Button>
              </Box>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Select a conversation to start chatting.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Messages; 