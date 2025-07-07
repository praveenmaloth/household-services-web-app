import { Router } from "express";
import { updateProfile } from "../controllers/profileController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();

router.post("/update", isAuthenticated, updateProfile);

export default router;