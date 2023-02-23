const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const app = express();
const port = process.env.PORT;
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const { readdirSync } = require("fs");

connectDB();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(morgan("dev"));

// auto load routes from routes folder
readdirSync("./src/routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!!!",
  });
});

// app.use("/api/auth", require("./routes/auth"));

module.exports = app;
