import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.mjs";
import authRoutes from "./src/routes/authRoutes.mjs";

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON requests

app.use("/api/auth", authRoutes);

// Sync database & start server
const PORT = process.env.PORT || 5001;
sequelize.sync()
  .then(() => {
    console.log("Database connected ✅");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("DB Connection Error ❌", err));
