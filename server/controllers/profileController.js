import db from "../config/database.js";

export const updateProfile = async (req, res) => {
  if (!req.user || !req.user.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { name, profileImage } = req.body;
  const email = req.user.email;

  try {
    const query = profileImage
      ? "UPDATE users SET name = $1, profile_image = $2 WHERE email = $3 RETURNING *"
      : "UPDATE users SET name = $1 WHERE email = $2 RETURNING *";

    const values = profileImage ? [name, profileImage, email] : [name, email];
    const { rows } = await db.query(query, values);

    if (rows.length > 0) {
      res.json({ success: true, message: "Profile updated successfully", user: rows[0] });
    } else {
      res.status(400).json({ message: "Profile update failed" });
    }
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};