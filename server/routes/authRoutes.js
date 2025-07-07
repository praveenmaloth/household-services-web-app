import { Router } from "express";
import {
  registerUser,
  loginUser,
  providerLogin,
  logoutUser,
  getUserData
} from "../controllers/authController.js";
import passport from "../config/passport.js";
import upload from "../config/multer.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/provider/login", providerLogin);
router.get("/logout", logoutUser);
router.get("/user", passport.authenticate("session"), getUserData);
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please upload an image" });
  }
  const imageUrl = `${process.env.SERVER_URL}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

export default router;