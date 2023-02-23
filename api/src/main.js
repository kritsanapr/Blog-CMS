const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!!!",
  });
});

app.use((request, response) => {
  response.json({ message: "Hey! This is your server response!" });
});

app.use("/api/auth", require("./routes/auth.route"));

module.exports = app;
