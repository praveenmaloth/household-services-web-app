import db from "../config/database.js";

export const getReviews = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM reviews ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addReview = async (req, res) => {
  const { name, rating, title, text } = req.body;
  if (!name || !rating || !title || !text) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await db.query(
      "INSERT INTO reviews (name, rating, title, text) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, rating, title, text]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};