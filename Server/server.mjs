import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.mjs";
import authRoutes from "./src/routes/authroutes.mjs";

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON requests

app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);

console.log("Loaded DB_USER:", process.env.DB_USER);
console.log("Loaded DB_NAME:", process.env.DB_NAME);

// Sync database & start server
const PORT = process.env.PORT || 5001;
sequelize.sync()
  .then(() => {
    console.log("Database connected ✅");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("DB Connection Error ❌", err));
