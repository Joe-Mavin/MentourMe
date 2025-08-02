import React from 'react';
import { Box, Typography, Divider, TextField, Button, Paper } from '@mui/material';

const ChatInterface = ({ 
  selectedUser, 
  messages, 
  newMessage, 
  setNewMessage, 
  onSendMessage,
  paramUserId 
}) => {
  // Helper function to decode JWT and get user ID
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  return (
    <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {selectedUser ? (
        <>
          <Typography variant="h6" gutterBottom>Chat with {selectedUser.name}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
            {messages.map(msg => {
              const currentUserId = getUserIdFromToken();
              return (
                <Box key={msg.id} sx={{ mb: 1, textAlign: msg.senderId === currentUserId ? 'right' : 'left' }}>
                  <Paper sx={{ 
                    display: 'inline-block', 
                    p: 1.5, 
                    bgcolor: msg.senderId === currentUserId ? 'primary.light' : 'grey.100' 
                  }}>
                    <Typography variant="body2">{msg.content}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(msg.createdAt).toLocaleString()}
                    </Typography>
                  </Paper>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Type a message..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') onSendMessage(); }}
            />
            <Button variant="contained" onClick={onSendMessage}>Send</Button>
          </Box>
        </>
      ) : (
        <Typography variant="body1" color="text.secondary">
          {paramUserId ? 'No conversation found yet. Start a new message!' : 'Select a conversation to start chatting.'}
        </Typography>
      )}
    </Box>
  );
};

export default ChatInterface; 