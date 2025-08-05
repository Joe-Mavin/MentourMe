import { Router } from 'express';
import { sendMessage, getMessagesForUser, markMessageAsRead } from '../controllers/messageController.mjs';

const router = Router();

router.post('/messages', sendMessage);
router.get('/messages/:userId', getMessagesForUser);
router.patch('/messages/:messageId/read', markMessageAsRead);

export default router; 