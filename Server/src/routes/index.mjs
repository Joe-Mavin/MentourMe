import { Router } from "express";
import userRoutes from "./user.routes.mjs";
import botRoutes from "./botroutes.mjs";
import authRoutes from "./authroutes.mjs";
import messagesRoutes from './messages.mjs';

const router = Router();

router.use("/users", userRoutes);
router.use("/bot", botRoutes);
router.use("/auth", authRoutes);
router.use("/messages", messagesRoutes);

export default router;
