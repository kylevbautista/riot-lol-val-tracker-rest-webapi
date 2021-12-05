import express from "express";
const router = express.Router();
import User from "../models/User.js";

export class FollowsController {
  // Middleware
  followMiddleware = async (req, res, next) => {
    let user;
    try {
      user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: "Cant find person" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    res.user = user;
    next();
  };

  // GET /follows/:id
  getAllFollows = async (req, res) => {
    try {
      res.json(res.user.following);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // PATCH /follows/:id
  addFollow = async (req, res) => {
    const exists = res.user.following.find((name) => {
      if (name.name === req.body.name) {
        return name;
      }
    });
    if (exists !== undefined) {
      return res.status(400).json({ status: "You are already following" });
    }
    try {
      const updateFollow = await User.updateOne(
        { _id: req.params.id },
        { $push: { following: { name: req.body.name } } },
        { runValidators: true }
      );
      res.status(201).json(updateFollow);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  //PATCH /follows/person/:id
  removeFollow = async (req, res) => {
    const exists = res.user.following.find((name) => {
      if (name.name === req.body.name) {
        return name;
      }
    });
    if (exists === undefined) {
      return res.status(400).json({ message: `Not following` });
    }
    try {
      const updateFollow = await User.updateOne(
        { _id: req.params.id },
        { $pull: { following: { name: req.body.name } } },
        { runValidators: true }
      );
      res.status(201).json(updateFollow);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}
