import express from 'express';
import { registerUser,login } from '../controllers/authController.mjs';
import { validateRegistration } from '../middlewares/validateRequest.mjs';

const router = express.Router();

router.post('/register', validateRegistration, registerUser);
router.post('/login', login);

export default router;
