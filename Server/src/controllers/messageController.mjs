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
  } catch {
    return null;
  }
}

// Send a message
export const sendMessage = async (req, res) => {
  const senderId = getUserIdFromReq(req);
  const { receiverId, content } = req.body;
  if (!senderId || !receiverId || !content) return res.status(400).json({ message: 'Missing fields' });
  try {
    const message = await Message.create({ senderId, receiverId, content });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
};

// Get all messages between logged-in user and another user
export const getConversation = async (req, res) => {
  const userId = getUserIdFromReq(req);
  const { userId: otherId } = req.params;
  if (!userId || !otherId) return res.status(400).json({ message: 'Missing userId' });
  try {
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
    res.status(500).json({ message: 'Failed to get conversation', error: err.message });
  }
};

// Get all conversations for the logged-in user (inbox)
export const getInbox = async (req, res) => {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  try {
    // Get all users this user has messaged or been messaged by
    const messages = await Message.findAll({
      where: {
        [Message.sequelize.Op.or]: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      order: [['createdAt', 'DESC']],
    });
    // Get unique user IDs
    const userIds = Array.from(new Set(messages.map(m => m.senderId === userId ? m.receiverId : m.senderId)));
    // Get user info
    const users = await User.findAll({ where: { id: userIds }, attributes: ['id', 'name', 'email', 'profilePicture', 'role'] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get inbox', error: err.message });
  }
}; 