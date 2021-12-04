// modules needed
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import followRoutes from "./routes/followRoutes.js";

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
  console.log("Conected to database");
});

// Middleware to use json
app.use(express.json());

// routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/follows", followRoutes);

// Choose port to run server on
app.listen(3001, () => {
  console.log("Server Started");
});
