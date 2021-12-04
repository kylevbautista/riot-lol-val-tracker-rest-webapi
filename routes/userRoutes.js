import express from "express";
const router = express.Router();
import { UserController } from "../controllers/UsersController.js";
import { authenticateToken } from "../services/auth.js";

const controller = new UserController();

router.get("/", authenticateToken, controller.getAllUsers);
router.get("/:id", controller.getUser);
router.patch("/:id", controller.userMiddleware, controller.updateUser);
router.delete("/:id", controller.userMiddleware, controller.deleteUser);

export default router;
