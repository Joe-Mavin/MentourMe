import jwt from "jsonwebtoken";
import Interaction from "../models/bot.mjs"; // Make sure path is correct

export const handleInteraction = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Extract data from request body
    const {
      name,
      age,
      goals,
      confidenceLevels,
      timeAvailability,
      addiction,
      socialLifeCategories,
    } = req.body;

    // Save to DB
    const newInteraction = await Interaction.create({
      name,
      age,
      goals,
      confidenceLevels,
      timeAvailability,
      addiction,
      socialLifeCategories,
      userId: decoded.id, // assuming token includes user id
    });

    console.log("New interaction saved:", newInteraction.id);

    res.status(201).json({
      message: "Interaction received and saved successfully",
      interactionId: newInteraction.id,
      submittedBy: decoded.name,
    });
  } catch (error) {
    console.error("Interaction error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
