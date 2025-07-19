import { Router } from "express";
import { getUsers, getProfile } from "../controllers/user.controller.mjs";

const router = Router();

router.get("/", getUsers);
router.get("/profile", getProfile);

export default router;
