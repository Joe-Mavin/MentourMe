import express from "express";
import { signUp, login, getProfile } from "../controllers/authController.mjs";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/", (req, res) => {
    res.send("Welcome to the API");
  });
  


export default router;
