import { Router } from "express";
import { getUsers, getProfile, getPublicProfile } from "../controllers/user.controller.mjs";
import requireAdmin from '../middleware/admin.js';
import { reviewMentorApplications, approveMentorApplication, rejectMentorApplication } from '../controllers/adminController.mjs';

const router = Router();

router.get("/", getUsers);
router.get("/profile", getProfile);
router.get('/:id/profile', getPublicProfile);
router.get('/admin/pending-mentors', requireAdmin, reviewMentorApplications);
router.post('/admin/approve-mentor/:userId', requireAdmin, approveMentorApplication);
router.post('/admin/reject-mentor/:userId', requireAdmin, rejectMentorApplication);

export default router;
