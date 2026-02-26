module.exports = function (err, req, res, next) {
  console.log("ERROR MIDDLEWARE TRIGGERED");
  console.log("Type of next:", typeof next);
  console.log("Error message:", err.message);

  res.status(500).json({
    status: "error",
    message: err.message,
  });
};
