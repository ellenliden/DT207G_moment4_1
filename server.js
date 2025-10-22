import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { config } from "./config.js";

// Ladda miljövariabler
dotenv.config();

const app = express();
const PORT = process.env.PORT || config.port;

//Middleware
app.use(cors());
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
    },
  });
});

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
