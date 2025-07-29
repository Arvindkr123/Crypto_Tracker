import { Router } from "express";
import { registerUserController, loginUserController,logoutUserController } from "../controllers/users.controllers.js";

const userRouter = Router();

userRouter.post("/register", registerUserController)
userRouter.post("/login", loginUserController)
userRouter.post("/logout", logoutUserController)

export default userRouter;