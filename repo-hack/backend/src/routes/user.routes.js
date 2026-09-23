import { Router } from "express";
import { getAllUsers } from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const userRouter = Router();

userRouter.get("/users", authMiddleware, getAllUsers);
