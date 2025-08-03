import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Paper, Tabs, Tab, Divider, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const ConversationList = ({ 
  tab, 
  setTab, 
  conversations, 
  mentors, 
  mentorError, 
  selectedUser, 
  onSelectConversation 
}) => {
  return (
    <Paper sx={{ width: 320, borderRadius: 0, boxShadow: 2, overflowY: 'auto' }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
        <Tab label="Conversations" />
        <Tab label="Mentors" />
      </Tabs>
      <Divider />
      {tab === 0 ? (
        conversations.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              You have no conversations yet.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/profile" sx={{ borderRadius: 3 }}>
              Start a New Conversation
            </Button>
          </Box>
        ) : (
          <List>
            {conversations.map(user => (
              <ListItem 
                button 
                key={user.id} 
                selected={selectedUser?.id === user.id} 
                onClick={() => onSelectConversation(user.id)}
              >
                <ListItemAvatar>
                  <Link to={`/profile/${user.id}`} style={{ textDecoration: 'none' }} onClick={e => e.stopPropagation()}>
                    <Avatar src={user.profilePicture} />
                  </Link>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Link to={`/profile/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={e => e.stopPropagation()}>
                      {user.name}
                    </Link>
                  }
                  secondary={user.role}
                />
              </ListItem>
            ))}
          </List>
        )
      ) : (
        <>
          {mentorError ? (
            <Typography color="error" sx={{ p: 2 }}>{mentorError}</Typography>
          ) : mentors.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                No mentors found.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/profile" sx={{ borderRadius: 3 }}>
                Find a Mentor
              </Button>
            </Box>
          ) : (
            <List>
              {mentors.map(mentor => (
                <ListItem 
                  button 
                  key={mentor.id} 
                  selected={selectedUser?.id === mentor.id} 
                  onClick={() => onSelectConversation(mentor.id)}
                >
                  <ListItemAvatar>
                    <Link to={`/profile/${mentor.id}`} style={{ textDecoration: 'none' }} onClick={e => e.stopPropagation()}>
                      <Avatar src={mentor.profilePicture} />
                    </Link>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Link to={`/profile/${mentor.id}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={e => e.stopPropagation()}>
                        {mentor.name}
                      </Link>
                    }
                    secondary={mentor.bio}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
    </Paper>
  );
};

export default ConversationList; 