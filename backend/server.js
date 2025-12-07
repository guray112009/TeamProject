import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// ROUTES IMPORT
import eventRoutes from "./routes/eventRoutes.js";
import lostFoundRoutes from "./routes/lostFoundRoutes.js";
import marketplaceRoutes from "./routes/marketplaceRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// ⭐ NEW — CHATBOT ROUTE
import chatbotRoutes from "./routes/chatbotRoutes.js";

dotenv.config();
const app = express();

/* ============================================================
   ⭐ IMPROVED CORS — REQUIRED FOR RENDER FRONTEND
   ============================================================ */
app.use(
  cors({
    origin: [
      "http://localhost:5173",       // local frontend
      "https://your-render-frontend-url.onrender.com", // Render frontend URL
      "*",                           // fallback (safe for your project)
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Body parser
app.use(express.json());

/* ============================================================
   TEST ROUTE
   ============================================================ */
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend working! 🔥",
    time: new Date(),
  });
});

/* ============================================================
   ROUTE MOUNTING
   ============================================================ */
app.use("/api/events", eventRoutes);
app.use("/api/lostfound", lostFoundRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/users", userRoutes);

// ⭐ NEW — CHATBOT ENDPOINT
app.use("/api/chatbot", chatbotRoutes);

/* ============================================================
   ⭐ GLOBAL ERROR HANDLER (Safe & professional)
   ============================================================ */
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);
  res.status(500).json({ error: "Something went wrong on the server." });
});

/* ============================================================
   START SERVER
   ============================================================ */
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
