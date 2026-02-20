// Import required packages
const express = require("express"); // Web framework
const bcrypt = require("bcryptjs"); // For hashing passwords
const jwt = require("jsonwebtoken"); // For generating JWT token
const User = require("../models/User"); // Import User model
const Task = require("../models/Task"); // Import Task model (for testing purposes)

// Create router object
const router = express.Router();

/* ======================================================
   🔹 REGISTER ROUTE
   Endpoint: POST /api/auth/register
   Purpose: Create new user and store in database
====================================================== */

router.post("/register", async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, password, role } = req.body;

    // Check if user already exists in database
    const userExists = await User.findOne({ email });

    if (userExists) {
      // If email already exists → return error
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate salt (random string added before hashing password)
    const salt = await bcrypt.genSalt(10);

    // Hash the password using salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword, // Store hashed password (NOT plain text)
      role,
    });

    // Send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // If any unexpected error occurs
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================================================
   🔹 LOGIN ROUTE
   Endpoint: POST /api/auth/login
   Purpose: Authenticate user and generate JWT
====================================================== */

router.post("/login", async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    // If password does not match
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id, // Store user id inside token
        role: user.role, // Store role inside token
      },
      process.env.JWT_SECRET, // Secret key from .env
      { expiresIn: "1d" }, // Token expires in 1 day
    );

    // Send token + user info as response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error); // 👈 ADD THIS
    res.status(500).json({ message: "Server error", error: error.message });
  }

});

// Export router so server.js can use it
module.exports = router;
