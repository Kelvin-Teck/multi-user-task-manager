import { assignTaskController, createTaskController, modifyTaskStatusController } from "@controllers/TaskConttroller";
import { AuthGuard } from "@middlewares/authMiddleware";
import express from "express";
const router = express.Router();

router.post("/create-task/:userId", [AuthGuard], createTaskController);
router.patch("/assign-task", [AuthGuard], assignTaskController);
router.patch("/modify-task-status/:userId", [AuthGuard], modifyTaskStatusController);


export default router;
