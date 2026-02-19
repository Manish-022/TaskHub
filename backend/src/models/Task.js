// Import mongoose
const mongoose = require("mongoose");

// Create Task Schema
const taskSchema = new mongoose.Schema(
  {
    // Task title (Required field)
    title: {
      type: String, // Data type is String
      required: true, // Cannot create task without title
    },

    // Task description (Optional field)
    description: {
      type: String, // Additional details about task
    },

    // Task status
    status: {
      type: String, // Only String values allowed
      enum: ["pending", "completed"], // Only these 2 values allowed
      default: "pending", // Default value when task is created
    },

    // Reference to the User who created this task
    user: {
      type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId
      ref: "User", // Reference to User model (creates relationship)
      required: true, // Every task must belong to a user
    },
  },

  // Automatically adds:
  // createdAt and updatedAt fields
  { timestamps: true },
);

// Export the model so we can use it in controllers
module.exports = mongoose.model("Task", taskSchema);
