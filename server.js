// modules needed
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// jsonwebtoken
import jwt from "jsonwebtoken";
import "dotenv/config";

// routes
import usersRouter from "./controllers/users.js";
import authRouter from "./controllers/auth.js";

const app = express();

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

// routes
app.use("/users", usersRouter);
app.use("/auth", authRouter);

// Choose port to run server on
app.listen(3001, () => {
  console.log("Server Started");
});
