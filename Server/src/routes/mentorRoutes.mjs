import express from 'express';
import { getMentors, getMentorDashboard, completeMentorOnboarding, getSpecializations } from '../controllers/mentorController.mjs';

const router = express.Router();

router.get('/', getMentors);
router.get('/mentor-dashboard', getMentorDashboard);
router.post('/onboard', completeMentorOnboarding);
// Message routes removed
router.get('/mentors', getMentors);
router.get('/specializations', getSpecializations);

export default router; 