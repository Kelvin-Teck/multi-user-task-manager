import { deleteCommentController, editCommentController } from '@controllers/commentController';
import { AuthGuard } from '@middlewares/authMiddleware';
import express from 'express';

const router = express.Router();

router.patch('/edit/:commentId', [AuthGuard], editCommentController);
router.delete('/delete/:commentId', [AuthGuard], deleteCommentController);

export default router;