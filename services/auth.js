import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User.js";

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    console.log("token is null");
    //return res.status(401).json({ message: "token bad?" });
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
    if (err) {
      //return res.status(403);
      return res.sendStatus(403);
    }
    next();
  });
};

const generateAccessToken = async (user) => {
  return jwt.sign(user, process.env.SECRET_TOKEN, { expiresIn: "24h" });
};

const generateRefreshToken = async (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN);
};

const refreshToAccessToken = async (req, res, next) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) {
    return res.sendStatus(401);
  }
  // check if refresh token in database. find user associated with refresh token
  let user;
  try {
    user = await User.findOne({ name: "a" });
    if (user == null) {
      return res.status(404).json({ message: "Cant find user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accessToken = generateAccessToken(user.name);
    res.status(200).json({ accessToken: accessToken });
  });
};

export {
  authenticateToken,
  generateAccessToken,
  generateRefreshToken,
  refreshToAccessToken,
};
