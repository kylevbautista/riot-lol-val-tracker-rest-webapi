// modules needed
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const cors = require("cors");
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

// routes
//const authRouter = require("./controllers/auth");
import authRouter from "./controllers/auth.js";

// jsonwebtoken
// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";

// cors
app.use(cors());

// mongodb conneciton
mongoose.connect(
  "mongodb+srv://admin:admin1@cluster0.doegn.mongodb.net/riot?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", (error) => {
  console.log("conected to database");
});

// middleware to use json
app.use(express.json());

// user routes
// const usersRouter = require("./controllers/users");
import usersRouter from "./controllers/users.js";
app.use("/users", usersRouter);

app.use("/auth", authRouter);

// Choose port and server
app.listen(3000, () => {
  console.log("Server Started");
});
