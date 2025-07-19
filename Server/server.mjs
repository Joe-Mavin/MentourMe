import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.mjs";
import authRoutes from "./src/routes/authroutes.mjs";
import botRoutes from "./src/routes/botroutes.mjs"
import userRoutes from "./src/routes/user.routes.mjs";
import cors from "cors";

dotenv.config();

const app = express();

// More secure CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173', // Vite's default port
  'https://testmehere.onyangojp.tech'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json()); // Parse JSON requests

app.use("/",authRoutes);
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes); // No /api prefix
app.use("/api/bot", botRoutes);
app.use("/bot",botRoutes)
app.use("/api/users", userRoutes);

console.log("Loaded DB_USER:", process.env.DB_USER);
console.log("Loaded DB_NAME:", process.env.DB_NAME);

// Sync database & start server
const PORT = process.env.PORT || 5001;
sequelize.sync()
  .then(() => {
    console.log("Database connected ✅");
    app.listen(PORT, "localhost", () => console.log(`Server running on all interfaces (0.0.0.0:5001)`));
  })
  .catch((err) => console.error("DB Connection Error ❌", err));
