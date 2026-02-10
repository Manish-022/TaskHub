// Import mongoose library
// Mongoose helps us define structure (schema) for MongoDB documents
const mongoose = require("mongoose");

// Create a Schema (Blueprint of User document)
const userSchema = new mongoose.Schema(
  {
    // name field
    name: {
      type: String, // Data type will be String
      required: true, // This field must be provided while creating user
    },

    // email field
    email: {
      type: String, // Email must be a String
      required: true, // Cannot create user without email
      unique: true, // No two users can have same email (adds unique index)
    },

    // password field
    password: {
      type: String, // Will store hashed password (not plain text)
      required: true, // Password is mandatory
    },

    // role field (for authorization)
    role: {
      type: String, // Role is stored as string
      default: "user", // If not provided, it automatically becomes "user"
    },
  },
  {
    // Automatically adds:
    // createdAt → when user was created
    // updatedAt → when user was last updated
    timestamps: true,
  },
);

// Export the model
// "User" → MongoDB collection name will become "users"
// userSchema → structure of each document
module.exports = mongoose.model("User", userSchema);
