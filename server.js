// modules needed
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

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
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// Choose port and server
app.listen(3000, () => {
  console.log("Server Started");
});
