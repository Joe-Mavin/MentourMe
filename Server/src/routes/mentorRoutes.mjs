import express from 'express';
import { getMentors, getMentorDashboard, completeMentorOnboarding } from '../controllers/mentorController.mjs';

const router = express.Router();

router.get('/', getMentors);
router.get('/mentor-dashboard', getMentorDashboard);
router.post('/onboard', completeMentorOnboarding);

export default router; 