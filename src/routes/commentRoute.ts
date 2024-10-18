import { deleteCommentController, editCommentController } from '@controllers/commentController';
import { AuthGuard } from '@middlewares/authMiddleware';
import express from 'express';

const router = express.Router();

router.patch('/edit/:commentId', [AuthGuard], editCommentController);//edit comment route
router.delete('/delete/:commentId', [AuthGuard], deleteCommentController);//delete comment route

export default router;