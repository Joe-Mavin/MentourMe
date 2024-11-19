import express from "express";
import { getAIResponse } from "../services/openaiService.mjs";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const reply = await getAIResponse(message);
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
});

export default router;
