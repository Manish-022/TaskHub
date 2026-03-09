const express = require("express");
const router = express.Router();

const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/checkAdmin");

/* ======================================================
   🔹 GET ALL USERS (Admin Only)
====================================================== */

router.get("/users", authMiddleware, checkAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

/* ======================================================
   🔹 DELETE USER (Admin Only)
====================================================== */

router.delete("/users/:id", authMiddleware, checkAdmin, async (req, res) => {
  try {
    // Prevent admin from deleting himself
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        status: "error",
        message: "Admin cannot delete his own account",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
