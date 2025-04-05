import express from "express";
import {signup,login} from "../controllers/authController.mjs";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/", (req, res) => {
    res.send("Welcome to the API");
  });
  


export default router;
