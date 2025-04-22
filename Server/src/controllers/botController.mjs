import jwt from "jsonwebtoken";

export const handleInteraction = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Access the request body
    const {
      name,
      age,
      goals,
      confidenceLevels,
      timeAvailability,
      addiction,
      socialLifeCategories,
    } = req.body;

    // You can log or process data here, save to DB, etc.
    console.log("Received interaction from:", decoded.name);
    console.log("Form Data:", req.body);

    // Optionally save this data in a DB model e.g. `Interaction.create({ ... })`

    res.status(200).json({ message: "Interaction received successfully", submittedBy: decoded.name });
  } catch (error) {
    console.error("Interaction error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
