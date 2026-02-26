// Import required packages
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const router = express.Router();

/* ======================================================
   🔹 REGISTER ROUTE
   Endpoint: POST /api/auth/register
====================================================== */

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return next(new ApiError(400, "All fields are required"));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new ApiError(400, "Email already registered"));
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      status: "success",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

/* ======================================================
   🔹 LOGIN ROUTE
   Endpoint: POST /api/auth/login
====================================================== */

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ApiError(400, "Email and password are required"));
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return next(new ApiError(400, "Invalid credentials"));
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      status: "success",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
