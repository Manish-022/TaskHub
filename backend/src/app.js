const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => {
  res.send("TaskHub API Running 🚀");
});

app.use(errorMiddleware); // MUST BE LAST

module.exports = app;
