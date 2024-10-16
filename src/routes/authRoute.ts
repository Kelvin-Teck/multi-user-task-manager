import express from 'express';
import {createUserController, loginUserController} from '../controllers/AuthController'
import { createRateLimiter } from '@middlewares/auth.middleware';
const router = express.Router();

router.post('/register', createUserController);
router.post("/login",[createRateLimiter(5,2)], loginUserController);


export default router;