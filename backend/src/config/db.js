// Import mongoose library
// Mongoose is an ODM (Object Data Modeling) library
// It helps us interact with MongoDB using JavaScript objects
const mongoose = require("mongoose");

// Create an async function to connect to MongoDB
// async → because database connection takes time
const connectDB = async () => {
  try {
    // mongoose.connect() establishes connection with MongoDB
    // process.env.MONGO_URI → value comes from .env file
    // This keeps sensitive data secure (good practice)
    await mongoose.connect(process.env.MONGO_URI);

    // If connection is successful, this will print
    console.log("MongoDB Connected ✅");
  } catch (error) {
    // If connection fails, error will be caught here
    console.error("DB Connection Failed ❌");

    // Stop the server if DB is not connected
    // Because app cannot work without database
    process.exit(1);
  }
};

// Export this function so we can use it inside server.js
module.exports = connectDB;
