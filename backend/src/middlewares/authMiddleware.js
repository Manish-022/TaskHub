const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return next(new ApiError(401, "User not found"));
      }

      return next();
    } catch (error) {
      return next(new ApiError(401, "Invalid or expired token"));
    }
  }

  return next(new ApiError(401, "No token provided"));
};

module.exports = protect;
