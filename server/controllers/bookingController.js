import db from "../config/database.js";

export const createBooking = async (req, res) => {
  const { userId, providerId, service, date, time, address, phone, name } = req.body;

  if (!userId || !providerId || !service || !date || !time || !address || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await db.query(
      "INSERT INTO bookings (user_id, provider_id, service, booking_date, time, address, phone, name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [userId, providerId, service, date, time, address, phone, name]
    );
    res.status(201).json({ message: "Booking successful", booking: result.rows[0] });
  } catch (err) {
    console.error("Error booking service:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await db.query("SELECT * FROM bookings WHERE user_id = $1", [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const cancelBooking = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "Booking ID is required" });

  try {
    const result = await db.query("DELETE FROM bookings WHERE id = $1 RETURNING *", [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ message: "Booking cancelled successfully", booking: result.rows[0] });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const respondToBooking = async (req, res) => {
  const { bookingId, status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    await db.query("UPDATE bookings SET status = $1 WHERE id = $2", [status, bookingId]);
    res.json({ message: `Booking ${status} successfully` });
  } catch (err) {
    console.error("Error updating booking status:", err);
    res.status(500).json({ message: "Server error" });
  }
};