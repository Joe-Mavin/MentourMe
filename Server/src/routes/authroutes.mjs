import express from "express";
import { signup,getUsers } from "../controllers/authController.mjs";

const router = express.Router();

router.post("/signup", signup);
router.get("/users", getUsers);


export default router;
