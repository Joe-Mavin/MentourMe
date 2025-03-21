import express from "express";
import {signup} from "../controllers/authController.mjs";

const router = express.Router();

router.post("/signup", signup);
router.get("/", (req, res) => {
    res.send("Welcome to the API");
  });
  


export default router;
