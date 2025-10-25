// Ladda miljövariabler från .env-fil
import dotenv from "dotenv";
dotenv.config();

// Konfiguration med miljövariabler (enligt föreläsningsunderlag)
export const config = {
  // MongoDB connection string (från miljövariabel eller fallback)
  mongodbUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://lidenellen:Hallonpaj96@moment4.mlmq3gj.mongodb.net/?retryWrites=true&w=majority&appName=moment4",

  // JWT settings (från miljövariabler eller fallback)
  jwtSecret: process.env.JWT_SECRET || "nyckel-här",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "24h",

  // Server settings (från miljövariabler eller fallback)
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",

  // Säkerhetsinställningar
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
};

// Validera kritiska miljövariabler för production
if (config.nodeEnv === "production") {
  if (!process.env.MONGODB_URI) {
    console.error("FEL: MONGODB_URI måste vara satt i production");
    process.exit(1);
  }
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === "nyckel-här") {
    console.error("FEL: JWT_SECRET måste vara satt i production");
    process.exit(1);
  }
}
