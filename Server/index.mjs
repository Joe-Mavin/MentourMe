import express from "express";
import authRoutes from "./routes/authRoutes.mjs";
import botRoutes from "./routes/botRoutes.mjs";
import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "./database.mjs"; // Import Sequelize instance
import "./models/User.mjs"; // Ensure models are registered
import "./models/BotInteraction.mjs"; // Import other models if needed
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow required HTTP methods
    credentials: true, // Support cookies/auth headers
  })
);

app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api", botRoutes);

// Sync Sequelize models and start server
sequelize
  .sync({ alter: true }) // Use `alter: true` to auto-update schema without data loss
  .then(() => {
    console.log("Database synced successfully!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database sync error:", err);
  });
