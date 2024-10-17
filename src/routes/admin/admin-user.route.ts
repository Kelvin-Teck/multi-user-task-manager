import express from "express";
import { AuthGuard, AdminGuard } from "@middlewares/authMiddleware";
import { createAdminController } from "@controllers/admin/admin-user.controller";


const router = express.Router();

router.post("/create-admin", [AuthGuard, AdminGuard], createAdminController);

export default router;
