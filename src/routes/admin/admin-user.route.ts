import express from "express";
import { AuthGuard, AdminGuard } from "@middlewares/authMiddleware";
import { createAdminController } from "@controllers/admin/admin-user.controller";
import { modifyTaskStatusController } from "@controllers/TaskController";

const router = express.Router();

router.post("/create-admin", [AuthGuard, AdminGuard], createAdminController);//Creation of Admin Route 
router.patch(
  "/modify-task-status/:userId",
  [AuthGuard, AdminGuard],
  modifyTaskStatusController
);//Task Status modification Route

export default router;
