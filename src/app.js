require("dotenv").config();
const express = require("express");
const cors = require("cors");

const router = require("./routes");
const { error } = require("./utils/apiResponse");
const { NotFoundError } = require("./utils/errors");
const { connectToDB } = require("./db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1", router);
app.use((req, res, next) => {
  return next(new NotFoundError());
});
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  return res.status(status).json(error(message));
});

module.exports = app;
