import express from "express"
import authRoutes from './routes/authRoutes.mjs'
import botRoutes from './routes/botRoutes.mjs'
import bodyParser from "body-parser";
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 5000

// Middleware
app.use(
    cors({
      origin: "http://localhost:5173", // Allow your frontend's origin
      methods: ["GET", "POST"], // Allow specific HTTP methods
      credentials: true, // If you want to allow cookies or authorization headers
    })
  );

app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use("/api", botRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


