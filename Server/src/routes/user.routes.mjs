import { Router } from "express";
import { getUsers, getProfile, getPublicProfile } from "../controllers/user.controller.mjs";

const router = Router();

router.get("/", getUsers);
router.get("/profile", getProfile);
router.get('/:id/profile', getPublicProfile);

export default router;
