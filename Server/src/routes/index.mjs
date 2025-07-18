import { Router } from "express";
import userRoutes from "./user.routes.mjs";
import botRoutes from "./botroutes.mjs";

const router = Router();

router.use("/users", userRoutes);
router.use("/bot", botRoutes);

export default router;
