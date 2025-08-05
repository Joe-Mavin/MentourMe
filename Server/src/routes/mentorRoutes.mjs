import express from 'express';
import { getMentors, getMentorDashboard, completeMentorOnboarding, getSpecializations } from '../controllers/mentorController.mjs';
import { sendMessage } from '../controllers/messageController.mjs';

const router = express.Router();

router.get('/', getMentors);
router.get('/mentor-dashboard', getMentorDashboard);
router.post('/onboard', completeMentorOnboarding);
router.post('/messages', sendMessage);
// Removed conversation and inbox routes since their handlers were deleted
router.get('/mentors', getMentors);
router.get('/specializations', getSpecializations);

export default router; 