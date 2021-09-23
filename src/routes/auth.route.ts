import { Router } from "express";
import {
  registerUser,
  login,
  getUserById,
  updateUserById,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", login);
authRouter.get("/getUserById/:id", getUserById);
authRouter.post("/updateUserById", updateUserById);

export default authRouter;
