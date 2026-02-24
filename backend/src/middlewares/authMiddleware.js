// Import jsonwebtoken package
// Used to verify the token sent by client
const jwt = require("jsonwebtoken");

// Import User model
// Used to fetch user details from database
const User = require("../models/User");

// Middleware function
// It runs BEFORE protected route executes
// next() → moves to next function (actual route)
const protect = async (req, res, next) => {
  let token; // Variable to store extracted token

  // Check if request has Authorization header
  // Format should be: "Bearer TOKEN"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // Extract token from header
    // "Bearer abcdef12345"
    // split(" ") → ["Bearer", "abcdef12345"]
    token = req.headers.authorization.split(" ")[1];
    // token = rawToken.replace(/^"+|"+$/g, "");
    console.log(token);

    try {
      // Verify token using secret key
      // If invalid or expired → throws error

      // decoded teaches us what we stored while generating token
      // Example:
      // { id: "userId123", role: "user", iat: ..., exp: ... }

      // Find user from database using id inside token
      // .select("-password") → exclude password field

      console.log("Authorization Header:", req.headers.authorization);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      console.log("User Found:", req.user);


      console.log("AUTH HEADER:", req.headers.authorization);
      console.log("TOKEN:", token);
      console.log("SECRET:", process.env.JWT_SECRET);

      // Move to next middleware or route
      next();
    } catch (error) {
      // If token invalid or expired
      return res.status(401).json({ message: "Not authorized" });
    }
  }

  // If no token found in header
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
};

// Export middleware
module.exports = protect;
