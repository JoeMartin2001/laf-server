import { Router } from 'express';
import {
  registerUser,
  login,
  getUserById,
  updateUserById,
  updateUserAvatarId,
} from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', login);
authRouter.get('/getUserById/:id', getUserById);
authRouter.post('/updateUserById/:id', updateUserById);
authRouter.post('/updateUserAvatarId/:id', updateUserAvatarId);

export default authRouter;
