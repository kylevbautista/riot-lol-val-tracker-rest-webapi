const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// CREATE one
router.post("/register", async (req, res) => {
  // ------------bcrypt--------------
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  // ----------end of bcrypt---------

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
    following: req.body.following,
  });
  try {
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    console.log(user);
    if (user) {
      const validate = await bcrypt.compare(req.body.password, user.password);
      console.log("validate " + validate);
      if (validate) {
        // ---------JsonWebToken--------------
        const token = jwt.sign(
          {
            name: req.body.name,
            password: req.body.password,
          },
          "secret123"
        );
        // -----------end of addition----------
        res.status(200).json({ message: "logged in", token: token });
      } else {
        res.status(400).json({ message: "Wrong Credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
