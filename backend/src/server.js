// Load environment variables from .env file
// Must be called at top before using process.env
require("dotenv").config();

// Import required packages
const express = require("express"); // Backend framework
const cors = require("cors"); // Allows frontend to connect
const connectDB = require("./config/db"); // Our DB connection file

// Create express app
const app = express();

// Connect to database before starting server
connectDB();

// --------------------
// MIDDLEWARES
// --------------------

// Enable CORS
// Without this, frontend (localhost:3000) cannot call backend (localhost:5000)
app.use(cors());

// Parse JSON body
// Allows us to read req.body in POST/PUT requests
app.use(express.json());

// --------------------
// ROUTES
app.use("/api/auth", require("./routes/authRoutes")); 

// --------------------

// Test route
// When user hits http://localhost:5000/
app.get("/", (req, res) => {
  res.send("TaskHub API Running 🚀");
});

// --------------------
// SERVER START
// --------------------

// Use PORT from .env or default 5001
const PORT = process.env.PORT || 5001;

// Start listening on that port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

