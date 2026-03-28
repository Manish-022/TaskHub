const express = require("express");
const asyncHandler = require("express-async-handler");
const { chatWithAI } = require("../../services/aiService");
const protect = require("../middlewares/authMiddleware"); // ✅ FIXED

const router = express.Router();

router.post(
  "/chat",
  protect,
  asyncHandler(async (req, res) => {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    try {
      const aiResponse = await chatWithAI(message);

      res.json({
        success: true,
        response: aiResponse,
        timestamp: new Date(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || "AI service error",
      });
    }
  }),
);

module.exports = router;
