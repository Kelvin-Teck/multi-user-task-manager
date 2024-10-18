import express from "express";
import { AuthGuard, AdminGuard } from "@middlewares/authMiddleware";
import { deleteCommentAdminController } from "@controllers/admin/admin-comment.controller";


const router = express.Router();

router.delete("/delete/:commentId", [AuthGuard, AdminGuard], deleteCommentAdminController);//comment deletion Route for Admin


export default router;
