import express from "express";
import { handleInteraction } from "../controllers/botController.mjs";

const router = express.Router();

router.post("/interactions", handleInteraction);

export default router;
