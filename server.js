// modules needed
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const cors = require("cors");
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app = express();

// routes
// const usersRouter = require("./controllers/users");
import usersRouter from "./controllers/users.js";
//const authRouter = require("./controllers/auth");
import authRouter from "./controllers/auth.js";

// jsonwebtoken
// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";

// cors
app.use(cors());

// mongodb conneciton
mongoose.connect(process.env.CONNECTION_STRING);
const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", (error) => {
  console.log("conected to database");
});

// Middleware to use json
app.use(express.json());

// user routes
app.use("/users", usersRouter);
app.use("/auth", authRouter);

// Choose port to run server on
app.listen(3001, () => {
  console.log("Server Started");
});
