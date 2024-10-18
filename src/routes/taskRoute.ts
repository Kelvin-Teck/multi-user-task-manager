import {
  addCommentToTaskController,
  assignTaskController,
  createTaskController,
  modifyTaskStatusController,
  retriveFilteredTasksByTagController,
} from "@controllers/TaskController";
import { AuthGuard } from "@middlewares/authMiddleware";
import express from "express";
const router = express.Router();

router.get("/tasks", [AuthGuard], retriveFilteredTasksByTagController);
router
  .post("/create-task/:userId", [AuthGuard], createTaskController)
  .post("/add-comment/:taskId",[AuthGuard], addCommentToTaskController);
router
  .patch("/assign-task", [AuthGuard], assignTaskController)
  .patch(
    "/modify-task-status/:userId",
    [AuthGuard],
    modifyTaskStatusController
  );

export default router;
