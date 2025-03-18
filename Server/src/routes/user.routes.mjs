import { Router } from "express";
import { getUsers } from "../controllers/user.controller.mjs";

const router = Router();

router.get("/", getUsers);

export default router;
