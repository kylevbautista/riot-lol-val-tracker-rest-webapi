const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    requried: true,
  },
  DateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  following: [followSchema],
});

module.exports = mongoose.model("User", userSchema);
