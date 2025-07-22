import express from 'express';
import {
  getMentors,
  getTherapists,
  getSpecializations,
  createSpecialization,
  assignSpecializations,
  getMentorDashboard,
  getTherapistDashboard
} from '../controllers/mentorController.mjs';

const router = express.Router();

router.get('/mentors', getMentors);
router.get('/therapists', getTherapists);
router.get('/specializations', getSpecializations);
router.post('/specializations', createSpecialization);
router.post('/users/:id/specializations', assignSpecializations);
router.get('/mentor-dashboard', getMentorDashboard);
router.get('/therapist-dashboard', getTherapistDashboard);

export default router; 