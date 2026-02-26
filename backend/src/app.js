const express = require("express");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

// your routes here
app.use("/api/tasks", require("./routes/taskRoutes"));

// ✅ Error middleware MUST be last
app.use(errorMiddleware);

module.exports = app;
