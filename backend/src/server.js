const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to TaskHub API" });
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on ${process.env.PORT || 5000}`);   
}
);