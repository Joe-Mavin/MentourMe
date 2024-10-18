import express from "express";
import bodyParser from "body-parser";
import mainRouter from "./routes/index.mjs";

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Use the main router
app.use(mainRouter);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the User Registration API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
