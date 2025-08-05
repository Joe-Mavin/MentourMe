import Message from '../models/message.mjs';
import User from '../models/user.mjs';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

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