import db from "../config/database.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const registerProvider = async (req, res) => {
  const { name, email, password, service, experience, location, image } = req.body;

  if (!name || !email || !password || !service || !experience || !location) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newProvider = await db.query(
      "INSERT INTO service_providers (name, email, password, service, experience, location, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, email, hashedPassword, service, experience, location, image]
    );

    res.json({ success: true, provider: newProvider.rows[0], message: "Provider registered successfully" });
  } catch (err) {
    console.error("Error registering provider:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getProvidersByService = async (req, res) => {
  const { service } = req.params;
  
  try {
    const providers = await db.query("SELECT * FROM service_providers WHERE Lower(service) = Lower($1)", [service]);
    res.json(providers.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getProviderBookings = async (req, res) => {
  const { providerId } = req.params;

  try {
    const result = await db.query("SELECT * FROM bookings WHERE provider_id = $1", [providerId]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching provider bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProviderNotifications = async (req, res) => {
  const { providerId } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM bookings WHERE provider_id = $1 AND status IS NULL",
      [providerId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProviderContactInfo = async (req, res) => {
  const { providerId } = req.params;

  try {
    const result = await db.query(
      `SELECT bookings.id, bookings.date, bookings.time, bookings.address, bookings.status,
              users.name AS customer_name, users.email AS customer_email, users.phone AS customer_phone,
              service_providers.name AS provider_name, service_providers.service
       FROM bookings
       JOIN users ON bookings.user_id = users.id
       JOIN service_providers ON bookings.provider_id = service_providers.id
       WHERE bookings.provider_id = $1 AND bookings.status = 'accepted'`,
      [providerId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching provider bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
};