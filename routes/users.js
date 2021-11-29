const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Middleware
const getUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cant find user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
};

// GET All
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET one
router.get("/:id", getUser, (req, res) => {
  res.send(res.user);
});

// CREATE one
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    following: req.body.following,
  });
  try {
    const quer = await User.findOne({ email: req.body.email });
    console.log("adfsdf", quer);
    if (quer) {
      res.status(404).json({ message: "Account with email already exists" });
    } else {
      const newUser = await user.save();
      res.status(201).send(newUser);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATING one
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE one
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "deleted user" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
