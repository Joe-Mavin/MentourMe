// routes/botRoutes.mjs
import express from 'express';
import authenticateUser from '../middlewares/authenticateUser.mjs';
import * as botController from '../controllers/botController.mjs';  // Ensure this import is correct

const router = express.Router();

// Route to create a new bot interaction
router.post('/bot/interactions',authenticateUser, botController.createInteraction);

// Route to get all bot interactions for the authenticated user
router.get('/bot/interactions', authenticateUser, botController.getInteractions);

// Route to update a bot interaction
router.put('/bot/interactions/:id', authenticateUser, botController.updateInteraction);

// Route to delete a bot interaction
router.delete('/bot/interactions/:id', authenticateUser, botController.deleteInteraction);

export default router;
