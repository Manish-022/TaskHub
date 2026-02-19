// Import Task model
// This allows us to interact with the Task collection in MongoDB
const Task = require("../models/Task");

// =============================
// CREATE TASK
// =============================
exports.createTask = async (req, res) => {
  try {
    // Destructure title and description from request body
    const { title, description } = req.body;

    // Create a new task in database
    // user: req.user._id comes from auth middleware (JWT verified user)
    const task = await Task.create({
      title,
      description,
      user: req.user._id, // Attach logged-in user's ID
    });

    // Send created task with 201 status (Created)
    res.status(201).json(task);
  } catch (error) {
    // If any error occurs, send 500 (Server Error)
    res.status(500).json({ message: error.message });
  }
};

// =============================
// GET ALL TASKS FOR LOGGED IN USER
// =============================
exports.getTasks = async (req, res) => {
  try {
    // Find all tasks where user field matches logged-in user's ID
    // This ensures user only sees their own tasks (Ownership logic)
    const tasks = await Task.find({ user: req.user._id });

    // Send all tasks as response
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =============================
// UPDATE TASK
// =============================
exports.updateTask = async (req, res) => {
  try {
    // Find task by ID from URL parameter
    const task = await Task.findById(req.params.id);

    // If task does not exist → return 404
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // -------------------------
    // OWNERSHIP CHECK
    // -------------------------
    // Convert ObjectId to string for comparison
    // Ensure only the owner can update the task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Update only provided fields (Partial update)
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    // Save updated task in database
    const updatedTask = await task.save();

    // Send updated task
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =============================
// DELETE TASK
// =============================
exports.deleteTask = async (req, res) => {
  try {
    // Find task by ID
    const task = await Task.findById(req.params.id);

    // If task not found → 404
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Ownership validation
    // Only the user who created the task can delete it
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Delete task from database
    await task.deleteOne();

    // Send success message
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
