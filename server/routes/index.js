import { Router } from "express";
import authRoutes from "./authRoutes.js";
import bookingRoutes from "./bookingRoutes.js";
import providerRoutes from "./providerRoutes.js";
import profileRoutes from "./profileRoutes.js";
import reviewRoutes from "./reviewRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/bookings", bookingRoutes);
router.use("/providers", providerRoutes);
router.use("/profile", profileRoutes);
router.use("/reviews", reviewRoutes);

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

export default router;