const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 FIX HERE
    req.user = { _id: decoded.id };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Invalid or expired token",
    });
  }
};

module.exports = protect;
