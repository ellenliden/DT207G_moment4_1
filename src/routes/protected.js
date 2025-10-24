import express from "express";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

//GET /api/protected - skyddad route som kräver autentisering
router.get("/", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "Åtkomst till skyddad resurs lyckades",
    user: req.user,
    timestamp: new Date().toISOString(),
  });
});

//GET /api/protected/profile - användarens profil
router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "Profil hämtad framgångsrikt",
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      loginTime: new Date().toISOString(),
    },
  });
});

export default router;
