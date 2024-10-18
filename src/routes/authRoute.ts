import express from "express";
import {
  createUserController,
  loginUserController,
} from "../controllers/AuthController";
import { createRateLimiter } from "@middlewares/authMiddleware";
const router = express.Router();

router
  .post("/register", createUserController)
  .post("/login", [createRateLimiter(5, 2)], loginUserController);

export default router;
