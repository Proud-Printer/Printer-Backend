// initializing routes
import { Router } from 'express';
import { userController } from '../controllers/user';
import { auth } from '../middlewares/auth';

// initializing router
export const userRouter = Router();

// routes
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/me', auth, userController.me);
userRouter.get('/logout', auth, userController.logout);

// Path: controllers/user.ts