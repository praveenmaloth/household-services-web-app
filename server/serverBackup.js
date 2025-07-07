import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";



dotenv.config();
const app = express();
const saltRounds = 10;
const port = 5000;




app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

// PostgreSQL Database Connection
const db = new pg.Client({
  user: process.env.PG_USER ,
  host: process.env.PG_HOST ,
  database: process.env.PG_DATABASE ,
  password: process.env.PG_PASSWORD ,
  port: process.env.PG_PORT ,
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

// Multer Configuration for Image Upload
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Serve uploaded images as static files
app.use("/uploads", express.static("uploads"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        bcrypt.compare(password, user.password, (err, valid) => {
          if (valid) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid credentials" });
          }
        });
      } else {
        return done(null, false, { message: "User not found" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length > 0) {
      done(null, result.rows[0]);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err);
  }
});

// Routes

// Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// Register Route
app.post('/api/register', async (req, res) => {
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
});

//Login Route

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request:", email, password); // Debugging

  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      console.log("User not found!"); // Debugging
      return res.status(401).json({ error: "User not found" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!isMatch) {
      console.log("Invalid password!"); // Debugging
      return res.status(401).json({ error: "Invalid password" });
    }

    console.log("Login successful, sending userId:", user.rows[0].id); // Debugging
    res.json({ userId: user.rows[0].id, message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// provider login page 

app.post("/api/provider/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    // Check if the provider exists
    const providerResult = await db.query("SELECT * FROM service_providers WHERE email = $1", [email]);

    if (providerResult.rows.length === 0) {
      return res.status(401).json({ success: false, message: "Provider not found" });
    }

    const provider = providerResult.rows[0];

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, provider.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true, providerId: provider.id, message: "Login successful" });
  } catch (err) {
    console.error("Provider login error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});



// Logout Route
app.get("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.json({ success: true, message: "Logged out successfully" });
  });
});

// Retrieve User Data
app.get("/api/user", async (req, res) => {
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
});



// **Upload Profile Image**
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please upload an image" });
  }
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// **Register Service Provider**
app.post("/api/providers", async (req, res) => {
  const { name, email, password, service, experience, location, image } = req.body;

  if (!name || !email || !password || !service || !experience || !location) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash the password before storing
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
});


// **Fetch Service Providers by Service**
app.get("/api/providers/:service", async (req, res) => {
  const { service } = req.params;
  console.log("Received service:", service);  // Log service param to see if it's coming correctly
  try {
    const providers = await db.query("SELECT * FROM service_providers WHERE Lower(service) = Lower($1)", [service]);
    console.log("Providers retrieved:", providers.rows);
    console.log("Providers fetched from DB:", providers.rows);
    res.json(providers.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// profile route

app.post("/api/update-profile", async (req, res) => {
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
});



// booking Api

app.post("/api/book", async (req, res) => {

  console.log(req.body);
  const { userId, providerId, service, date, time, address , phone ,name} = req.body;
  console.log(phone);

  if (!userId || !providerId || !service || !date || !time || !address || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await db.query(
      "INSERT INTO bookings (user_id, provider_id, service, booking_date, time, address , phone ,name) VALUES ($1, $2, $3, $4, $5, $6 ,$7,$8) RETURNING *",
      [userId, providerId, service, date, time, address,phone,name]
    );
    res.status(201).json({ message: "Booking successful", booking: result.rows[0] });
  } catch (err) {
    console.error("Error booking service:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// fetch bookings

app.get("/api/bookings/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await db.query("SELECT * FROM bookings WHERE user_id = $1", [userId]);
    res.json(result.rows);
    console.log(result.rows)
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// cancel booking

app.delete("/api/bookings/:id", async (req, res) => {
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
});





// Nodemailer Configuration
console.log("Setting up Nodemailer...");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify Nodemailer Transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("Nodemailer Transporter Error:", error);
  } else {
    console.log("Nodemailer Transporter is ready to send emails");
  }
});

// Fetch provider bookings
app.get("/api/provider/bookings/:providerId", async (req, res) => {
  const { providerId } = req.params;
  console.log(`Fetching bookings for provider ID: ${providerId}`);

  try {
    const result = await db.query(
      "SELECT * FROM bookings WHERE provider_id = $1",
      [providerId]
    );
    console.log(`Bookings fetched: ${result.rows.length} records`);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching provider bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Accept/Reject booking request
// app.post("/api/booking/respond", async (req, res) => {
//   const { bookingId, status } = req.body;
//   console.log(`Processing booking response: ID=${bookingId}, Status=${status}`);

//   if (!["accepted", "rejected"].includes(status)) {
//     console.warn("Invalid status received:", status);
//     return res.status(400).json({ error: "Invalid status" });
//   }

//   try {
//     // Update booking status
//     const updateResult = await db.query(
//       "UPDATE bookings SET status = $1 WHERE id = $2",
//       [status, bookingId]
//     );
//     console.log(`Booking ID=${bookingId} updated with status: ${status}`);

//     // Fetch user email to send notification
//     console.log(`Fetching user email for booking ID=${bookingId}`);
//     const booking = await db.query(
//       "SELECT users.email, users.name, service_providers.name AS provider_name, service_providers.service FROM bookings " +
//       "JOIN users ON bookings.user_id = users.id " +
//       "JOIN service_providers ON bookings.provider_id = service_providers.id " +
//       "WHERE bookings.id = $1",
//       [bookingId]
//     );

//     if (booking.rows.length > 0) {
//       const { email, name, provider_name, service } = booking.rows[0];
//       console.log(`Sending email to: ${email}`);

//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: `Booking ${status.toUpperCase()}`,
//         text: `Hello ${name},\n\nYour booking for ${service} with ${provider_name} has been ${status}.\n\nThank you for using our service.`,
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error("Error sending email:", error);
//         } else {
//           console.log("Email sent successfully:", info.response);
//         }
//       });
//     } else {
//       console.warn(`No user found for booking ID=${bookingId}`);
//     }

//     res.json({ message: `Booking ${status} successfully` });
//   } catch (err) {
//     console.error("Error updating booking status:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

app.post("/api/booking/respond", async (req, res) => {
  const { bookingId, status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    console.log(`Updating booking ID ${bookingId} to ${status}`);

    // Update booking status in database
    await db.query(
      "UPDATE bookings SET status = $1 WHERE id = $2",
      [status, bookingId]
    );

    console.log(`Booking ${bookingId} updated to ${status}`);

    res.json({ message: `Booking ${status} successfully` });
  } catch (err) {
    console.error("Error updating booking status:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Fetch provider notifications
app.get("/api/provider/notifications/:providerId", async (req, res) => {
  const { providerId } = req.params;
  console.log(`Fetching notifications for provider ID: ${providerId}`);

  try {
    const result = await db.query(
      "SELECT * FROM bookings WHERE provider_id = $1 AND status IS NULL",
      [providerId]
    );
    console.log(`Notifications fetched: ${result.rows.length} records`);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// contact info of customer

app.get("/api/provider/bookings/:providerId", async (req, res) => {
  const { providerId } = req.params;

  try {
    console.log(`Fetching accepted bookings for provider ID: ${providerId}`);
    
    const result = await db.query(
      `SELECT bookings.id, bookings.date, bookings.time, bookings.address, bookings.status,
              users.name AS customer_name, users.email AS customer_email, users.phone AS customer_phone,
              service_providers.name AS provider_name, service_providers.service
       FROM bookings
       JOIN users ON bookings.user_id = users.id
       JOIN service_providers ON bookings.provider_id = service_providers.id
       WHERE bookings.provider_id = $1 AND bookings.status = 'accepted'`,  // Only show accepted bookings
      [providerId]
    );

    console.log("Accepted bookings fetched:", result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching provider bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM reviews ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new review
app.post("/api/reviews", async (req, res) => {
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
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
