// backend/routes/chatbotRoutes.js

import express from "express";
import { chatWithProfessor } from "../controllers/chatController.js";

const router = express.Router();

// POST /api/chatbot
router.post("/", chatWithProfessor);

export default router;
