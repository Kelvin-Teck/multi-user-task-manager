import { assignTaskController, createTaskController } from "@controllers/TaskConttroller";
import { AuthGuard } from "@middlewares/authMiddleware";
import express from "express";
const router = express.Router();

router.post("/create-task/:userId", [AuthGuard], createTaskController);
router.patch("/assign-task", [AuthGuard], assignTaskController);

export default router;
