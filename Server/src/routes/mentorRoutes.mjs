import express from 'express';
import { getMentors, getMentorDashboard, completeMentorOnboarding } from '../controllers/mentorController.mjs';
import { sendMessage, getConversation, getInbox } from '../controllers/messageController.mjs';

const router = express.Router();

router.get('/', getMentors);
router.get('/mentor-dashboard', getMentorDashboard);
router.post('/onboard', completeMentorOnboarding);
router.post('/messages', sendMessage);
router.get('/messages/conversation/:userId', getConversation);
router.get('/messages/inbox', getInbox);

export default router; 