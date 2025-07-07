import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import passport from "./config/passport.js";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

// ES Modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ 
  origin: process.env.CLIENT_URL || "http://localhost:3000", 
  credentials: true 
}));
app.use(bodyParser.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", routes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});