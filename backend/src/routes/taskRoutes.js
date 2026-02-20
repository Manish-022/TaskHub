// Import Express framework
const express = require("express");

// Create a new router object
// Router helps us define modular routes
const router = express.Router();

// Import controller functions
// These contain the actual business logic
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Import authentication middleware
// This middleware verifies JWT token
// and attaches logged-in user to req.user
const protect = require("../middlewares/authMiddleware");

// =============================
// CREATE TASK ROUTE
// =============================
// POST /api/tasks
// This route creates a new task
// "protect" middleware runs first to verify user
router.post("/", protect, createTask);

// =============================
// GET ALL USER TASKS
// =============================
// GET /api/tasks
// Returns only tasks of logged-in user
// Protect middleware ensures only authenticated users can access
router.get("/", protect, getTasks);

// =============================
// UPDATE TASK
// =============================
// PUT /api/tasks/:id
// :id is dynamic parameter (Task ID)
// Protect middleware ensures user is logged in
router.put("/:id", protect, updateTask);

// =============================
// DELETE TASK
// =============================
// DELETE /api/tasks/:id
// Only owner can delete (checked in controller)
router.delete("/:id", protect, deleteTask);

// Export router so it can be used in server.js
module.exports = router;
