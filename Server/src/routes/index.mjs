import { Router } from "express";
import userRoutes from "./user.routes.mjs";

const router = Router();

router.use("/users", userRoutes);
router.use("/api/bot", botRoutes);

export default router;
