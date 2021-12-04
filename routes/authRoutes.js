import express from "express";
const router = express.Router();
import { AuthController } from "../controllers/AuthController.js";

// Creating instance of AuthController
const controller = new AuthController();

// POST /auth/register
router.post("/register", controller.registerUser);
//POST /auth/login
router.post("/login", controller.loginUser);

export default router;
