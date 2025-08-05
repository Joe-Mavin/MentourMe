import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.mjs";
import authRoutes from "./src/routes/authroutes.mjs";
import botRoutes from "./src/routes/botroutes.mjs"
import userRoutes from "./src/routes/user.routes.mjs";
import mentorRoutes from "./src/routes/mentorRoutes.mjs";
import messagesRoutes from "./src/routes/messages.mjs";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import './src/models/user.mjs';
import './src/models/journey.mjs';
import './src/models/task.mjs';
import './src/models/message.mjs';
import './src/models/associations.mjs';

dotenv.config();

const app = express();

app.use(morgan('combined'));
app.use(helmet());

// Allow all origins for troubleshooting
app.use(cors());

app.use(express.json()); // Parse JSON requests

app.use("/",authRoutes);
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes); // No /api prefix
app.use("/api/bot", botRoutes);
app.use("/bot",botRoutes)
app.use("/api/users", userRoutes);
app.use("/api/mentorship", mentorRoutes);
app.use("/api/messages", messagesRoutes);

// CORS error handler
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'CORS error: Origin not allowed' });
  }
  next(err);
});

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

console.log("Loaded DB_USER:", process.env.DB_USER);
console.log("Loaded DB_NAME:", process.env.DB_NAME);

// Sync database & start server
const PORT = process.env.PORT || 5001;
sequelize.sync({ force: false })
  .then(async () => {
    console.log("Database synced ✅");
    
    // Manually create Message table if it doesn't exist
    try {
      await sequelize.query(`
        CREATE TABLE IF NOT EXISTS Messages (
          id VARCHAR(36) PRIMARY KEY,
          senderId VARCHAR(36) NOT NULL,
          receiverId VARCHAR(36) NOT NULL,
          content TEXT NOT NULL,
          isRead BOOLEAN DEFAULT false,
          createdAt DATETIME NOT NULL,
          updatedAt DATETIME NOT NULL,
          INDEX idx_sender (senderId),
          INDEX idx_receiver (receiverId)
        )
      `);
      console.log("Message table ready ✅");
    } catch (err) {
      console.log("Message table already exists or error:", err.message);
    }
    
    app.listen(PORT, "0.0.0.0", () => console.log(`Server running on all interfaces (0.0.0.0:${PORT})`));
  })
  .catch((err) => console.error("DB Connection Error ❌", err));
