import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/dashboard/sidebar';
import ConversationList from '../components/messages/ConversationList';
import ChatInterface from '../components/messages/ChatInterface';
import { useMessages } from '../hooks/useMessages';
import { useParams } from 'react-router-dom';

const Messages = () => {
  const { userId: paramUserId } = useParams();
  const messagesData = useMessages();

  useEffect(() => {
    if (paramUserId && (!messagesData.selectedUser || messagesData.selectedUser.id !== paramUserId)) {
      messagesData.fetchConversation(paramUserId);
    }
    // eslint-disable-next-line
  }, [paramUserId, messagesData.conversations, messagesData.selectedUser]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: 'flex', height: '100vh' }}>
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
    </Box>
  );
};

export default Messages; 