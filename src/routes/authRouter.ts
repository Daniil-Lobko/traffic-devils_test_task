import express from 'express';
import { register, login } from '../controllers/authController';
import { validateUser } from '../middleware/validateUser';

const authRouter = express.Router();

authRouter.post('/register', validateUser, register);
authRouter.post('/login', validateUser, login);

export default authRouter;
