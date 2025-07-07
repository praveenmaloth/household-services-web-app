import { Router } from "express";
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  respondToBooking
} from "../controllers/bookingController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();

router.post("/", isAuthenticated, createBooking);
router.get("/user/:userId", isAuthenticated, getUserBookings);
router.delete("/:id", isAuthenticated, cancelBooking);
router.post("/respond", isAuthenticated, respondToBooking);

export default router;