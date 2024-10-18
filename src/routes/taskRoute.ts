import {
  addCommentToTaskController,
  assignTaskController,
  createTaskController,
  modifyTaskStatusController,
  retrieveTasksController,
} from "@controllers/TaskController";
import { AuthGuard } from "@middlewares/authMiddleware";
import express from "express";
const router = express.Router();

router.get("/tasks", [AuthGuard], retrieveTasksController);//get Task route
router
  .post("/create-task/:userId", [AuthGuard], createTaskController)//creation of task route
  .post("/add-comment/:taskId", [AuthGuard], addCommentToTaskController);//add comment route
router
  .patch("/assign-task", [AuthGuard], assignTaskController)//task assignment route
  .patch(
    "/modify-task-status/:userId",
    [AuthGuard],
    modifyTaskStatusController
  );//task status modification route

export default router;
