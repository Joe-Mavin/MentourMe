import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import DashboardLayout from '../components/dashboard/UserDashboard/DashboardLayout';
import ConversationList from '../components/messages/ConversationList';
import ChatInterface from '../components/messages/ChatInterface';
import { useMessages } from '../hooks/useMessages';
import { useParams } from 'react-router-dom';

const Messages = () => {
  const { userId: paramUserId } = useParams();
  const messagesData = useMessages();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Debug logging
  console.log("Messages page loaded");

  // Get current user name and role from localStorage
  const currentUser = localStorage.getItem('name');
  const currentUserRole = localStorage.getItem('role');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (paramUserId && (!messagesData.selectedUser || messagesData.selectedUser.id !== paramUserId)) {
      messagesData.fetchConversation(paramUserId);
    }
    // eslint-disable-next-line
  }, [paramUserId, messagesData.conversations, messagesData.selectedUser]);

  return (
    <DashboardLayout
      currentUser={currentUser}
      currentUserRole={currentUserRole}
      mobileOpen={mobileOpen}
      onDrawerToggle={handleDrawerToggle}
    >
      <Box sx={{ display: 'flex', height: 'calc(100vh - 120px)' }}>
        <ConversationList
          tab={messagesData.tab}
          setTab={messagesData.setTab}
          conversations={messagesData.conversations}
          mentors={messagesData.mentors}
          mentorError={messagesData.mentorError}
          selectedUser={messagesData.selectedUser}
          onSelectConversation={messagesData.fetchConversation}
        />
        <ChatInterface
          selectedUser={messagesData.selectedUser}
          messages={messagesData.messages}
          newMessage={messagesData.newMessage}
          setNewMessage={messagesData.setNewMessage}
          onSendMessage={messagesData.handleSend}
          paramUserId={paramUserId}
        />
      </Box>
    </DashboardLayout>
  );
};

export default Messages; 