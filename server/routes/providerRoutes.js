import { Router } from "express";
import {
  registerProvider,
  getProvidersByService,
  getProviderBookings,
  getProviderNotifications,
  getProviderContactInfo
} from "../controllers/providerController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();

router.post("/", registerProvider);
router.get("/:service", getProvidersByService);
router.get("/bookings/:providerId", isAuthenticated, getProviderBookings);
router.get("/notifications/:providerId", isAuthenticated, getProviderNotifications);
router.get("/contact/:providerId", isAuthenticated, getProviderContactInfo);

export default router;