import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./config.js";
import authRoutes from "./src/routes/auth.js";
import protectedRoutes from "./src/routes/protected.js";

// Ladda miljövariabler
dotenv.config();

const app = express();
const PORT = process.env.PORT || config.port;

// Säkerhetsmiddleware (enligt föreläsningsunderlag)
app.use(helmet()); // Säkerhetsheaders
app.use(cors());

// Rate limiting för att förhindra brute force-attacker
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuter
  max: 100, // max 100 requests per IP per windowMs
  message: {
    success: false,
    message: "För många förfrågningar från denna IP, försök igen senare.",
  },
});
app.use(limiter);

// Särskild rate limiting för auth-endpoints (ökat för utveckling)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuter
  max: 100, // max 100 försök per IP per windowMs (ökat för utveckling)
  message: {
    success: false,
    message: "För många inloggningsförsök, försök igen senare.",
  },
});

app.use(express.json());

// grundläggande route
app.get("/", (req, res) => {
  res.json({
    message: "Moment4 Autentiserings-webbtjänst",
    version: "1.0.0",
    endpoints: {
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      protected: "GET /api/protected",
      profile: "GET /api/protected/profile",
    },
  });
});

// Routes med rate limiting för auth
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/protected", protectedRoutes);

// Databasanslutning
mongoose
  .connect(config.mongodbUri)
  .then(() => {
    console.log("Ansluten till MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB-anslutning misslyckades:", error);
  });

// Starta server
app.listen(PORT, () => {
  console.log(`Server körs på port ${PORT}`);
  console.log(`API tillgängligt på http://localhost:${PORT}`);
});
