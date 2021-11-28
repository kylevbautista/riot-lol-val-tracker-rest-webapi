const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", (req, res) => {
  req.params.id;
});
router.post("/", (req, res) => {});
router.patch("/:id", (req, res) => {
  req.params.id;
});
router.delete("/:id", (req, res) => {
  req.params.id;
});

module.exports = router;
