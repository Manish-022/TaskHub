const express = require("express");
const router = express.Router();

const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/checkAdmin");
const ApiError = require("../utils/ApiError");

/* ======================================================
   🔹 GET ALL USERS (Admin Only)
====================================================== */

router.get("/users", authMiddleware, checkAdmin, async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

/* ======================================================
   🔹 DELETE USER (Admin Only)
====================================================== */

router.delete(
  "/users/:id",
  authMiddleware,
  checkAdmin,
  async (req, res, next) => {
    try {
      // 🔒 Prevent admin from deleting himself
      if (req.user.id === req.params.id) {
        return next(new ApiError(400, "Admin cannot delete his own account"));
      }

      const user = await User.findById(req.params.id);

      if (!user) {
        return next(new ApiError(404, "User not found"));
      }

      await User.findByIdAndDelete(req.params.id);

      res.status(200).json({
        status: "success",
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
