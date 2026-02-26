const ApiError = require("../utils/ApiError");

const checkAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return next(new ApiError(403, "Access denied. Admins only."));
  }

  next();
};

module.exports = checkAdmin;
