import bcrypt from "bcrypt";
import db from "../config/database.js";

const saltRounds = 10;

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    res.json({ success: true, message: "User registered successfully", user: result.rows[0] });
  } catch (err) {
    console.error("Error in registration:", err);
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({ userId: user.rows[0].id, message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const providerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const providerResult = await db.query("SELECT * FROM service_providers WHERE email = $1", [email]);

    if (providerResult.rows.length === 0) {
      return res.status(401).json({ success: false, message: "Provider not found" });
    }

    const provider = providerResult.rows[0];
    const isMatch = await bcrypt.compare(password, provider.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true, providerId: provider.id, message: "Login successful" });
  } catch (err) {
    console.error("Provider login error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.json({ success: true, message: "Logged out successfully" });
  });
};

export const getUserData = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { rows } = await db.query("SELECT name, email, profile_image FROM users WHERE email = $1", [req.user.email]);
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });

    res.json({ user: rows[0] });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
};