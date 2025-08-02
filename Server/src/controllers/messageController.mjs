import Message from '../models/message.mjs';
import User from '../models/user.mjs';
import jwt from 'jsonwebtoken';

// Helper to get user ID from JWT
function getUserIdFromReq(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded.id;
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return null;
  }
}

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const senderId = getUserIdFromReq(req);
    const { receiverId, content } = req.body;
    
    if (!senderId) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
    
    if (!receiverId || !content) {
      return res.status(400).json({ message: 'Missing receiverId or content' });
    }
    
    const message = await Message.create({ senderId, receiverId, content });
    res.status(201).json(message);
  } catch (err) {
    console.error('Send message error:', err);
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
};

// Get all messages between logged-in user and another user
export const getConversation = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    const { userId: otherId } = req.params;
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
    
    if (!otherId) {
      return res.status(400).json({ message: 'Missing userId parameter' });
    }
    
    const messages = await Message.findAll({
      where: {
        [Message.sequelize.Op.or]: [
          { senderId: userId, receiverId: otherId },
          { senderId: otherId, receiverId: userId },
        ],
      },
      order: [['createdAt', 'ASC']],
    });
    res.json(messages);
  } catch (err) {
    console.error('Get conversation error:', err);
    res.status(500).json({ message: 'Failed to get conversation', error: err.message });
  }
};

// Get all conversations for the logged-in user (inbox)
export const getInbox = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
    
    // Get all messages this user has sent or received
    const messages = await Message.findAll({
      where: {
        [Message.sequelize.Op.or]: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      order: [['createdAt', 'DESC']],
    });
    
    // Get unique user IDs from conversations
    const userIds = Array.from(new Set(
      messages.map(m => m.senderId === userId ? m.receiverId : m.senderId)
    ));
    
    // Get user info for all conversation participants
    const users = await User.findAll({ 
      where: { id: userIds }, 
      attributes: ['id', 'name', 'email', 'profilePicture', 'role'] 
    });
    
    res.json(users);
  } catch (err) {
    console.error('Get inbox error:', err);
    res.status(500).json({ message: 'Failed to get inbox', error: err.message });
  }
}; 