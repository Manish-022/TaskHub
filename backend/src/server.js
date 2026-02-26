require("dotenv").config();

const app = require("./app"); // ONLY import app

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
