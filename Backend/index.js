// app.js

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require("./Router/Routes"); // ← renamed the import to “Routes” to avoid confusion

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", Router);

mongoose
  .connect(process.env.DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8000, () => {
      console.log("Server running at http://localhost:8000");
    });
  })
  .catch((err) => {
    console.error("Error while connecting to MongoDB:", err);
  });
