import Message from '../models/message.mjs';
import User from '../models/user.mjs';

// POST /api/messages
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    if (!senderId || !receiverId || !content) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
    const message = await Message.create({ senderId, receiverId, content });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
};

// GET /api/messages/:userId
export const getMessagesForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch messages where user is sender or receiver
    const messages = await Message.findAll({
      where: {
        [Message.sequelize.Op.or]: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      order: [['createdAt', 'ASC']],
      include: [
        { model: User, as: 'sender', attributes: ['id', 'name', 'role', 'profilePicture'] },
        { model: User, as: 'receiver', attributes: ['id', 'name', 'role', 'profilePicture'] }
      ]
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
};

// PATCH /api/messages/:messageId/read
export const markMessageAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findByPk(messageId);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    message.isRead = true;
    await message.save();
    res.json({ message: 'Message marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark as read', error: err.message });
  }
}; 