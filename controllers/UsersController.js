import express from "express";
const router = express.Router();
import User from "../models/User.js";
import bcrypt from "bcrypt";

export class UserController {
  constructor() {}

  // Middleware
  userMiddleware = async (req, res, next) => {
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

  // GET users
  getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, { _id: false, password: false });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // GET users/:id
  getUser = async (req, res) => {
    res.send(res.user);
  };

  // UPDATE users/:id
  updateUser = async (req, res) => {
    if (req.body.name != null) {
      res.user.name = req.body.name;
    }
    if (req.body.password != null) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      res.user.password = hashedPass;
    }
    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  // DELETE users/:id
  deleteUser = async (req, res) => {
    try {
      await res.user.remove();
      res.json({ message: "deleted user" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
}
