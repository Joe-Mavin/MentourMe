import express from "express";
import { handleInteraction } from "../controllers/botController.mjs";
// Placeholder imports for new controllers
import { generateJourney, getJourney, completeTask, skipTask, getLeaderboard } from "../controllers/journeyController.mjs";

const router = express.Router();

router.post("/interactions", handleInteraction);
// New endpoints
router.post("/generate-journey", generateJourney);
router.get("/journey", getJourney);
router.post("/task/:id/complete", completeTask);
router.post("/task/:id/skip", skipTask);
router.get("/leaderboard", getLeaderboard);

export default router;
