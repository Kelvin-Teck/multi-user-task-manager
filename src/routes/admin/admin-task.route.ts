import express from "express";
import { AuthGuard, AdminGuard } from "@middlewares/authMiddleware";
import { modifyTaskStatusController } from "@controllers/TaskController";

const router = express.Router();

router.patch(
  "/modify-task-status/:taskId",
  [AuthGuard, AdminGuard],
  modifyTaskStatusController
); //Task Status modification Route

export default router;
