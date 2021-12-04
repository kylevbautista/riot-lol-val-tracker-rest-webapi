import express from "express";
const router = express.Router();
import { FollowsController } from "../controllers/FollowsController.js";
import { authenticateToken } from "../services/auth.js";

// Creating instance of AuthController
const controller = new FollowsController();

// GET /follows/:id
router.get(
  "/:id",
  [authenticateToken, controller.followMiddleware],
  controller.getAllFollows
);
// PATCH /follows/:id
router.patch(
  "/:id",
  [authenticateToken, controller.followMiddleware],
  controller.addFollow
);
// PATCH /follows/person/:id
router.patch(
  "/person/:id",
  [authenticateToken, controller.followMiddleware],
  controller.removeFollow
);

export default router;
