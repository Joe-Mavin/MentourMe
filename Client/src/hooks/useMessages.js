import { useState, useEffect } from 'react';
import axios from 'axios';

export const useMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [tab, setTab] = useState(0);
  const [mentors, setMentors] = useState([]);
  const [mentorError, setMentorError] = useState(null);

  // Get user role to determine API path
  const userRole = localStorage.getItem('role');
  const API_BASE = userRole === 'mentor' || userRole === 'therapist' ? '/api/mentorship/messages' : '/api/users/messages';

  const fetchInbox = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/inbox`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConversations(res.data);
    } catch (err) {
      console.error('Failed to fetch inbox:', err);
      setConversations([]);
    }
  };

  const fetchConversation = async (userId) => {
    let user = conversations.find(u => u.id === userId);
    if (!user) {
      // Try to fetch user profile if not found in conversations (e.g., first message)
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/users/${userId}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        user = res.data;
      } catch (err) {
        setSelectedUser(null);
        setMessages([]);
        return;
      }
    }
    setSelectedUser(user);
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

  const fetchMentors = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/mentorship/mentors', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMentors(res.data);
      setMentorError(null);
    } catch (err) {
      setMentors([]);
      setMentorError('Failed to load mentors. Please try again later.');
    }
  };

  useEffect(() => {
    fetchInbox();
    fetchMentors();
  }, []);

  return {
    conversations,
    selectedUser,
    messages,
    newMessage,
    setNewMessage,
    tab,
    setTab,
    mentors,
    mentorError,
    fetchConversation,
    handleSend,
  };
}; 