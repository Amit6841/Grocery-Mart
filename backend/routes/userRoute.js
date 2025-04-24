import express from "express";
import { signup, login, logout, isAuth } from "../controllers/userController.js"
import { authUser } from "../middlewares/authUser.js";

const userRouter = express.Router()

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.get('/isauth', authUser, isAuth)
userRouter.get('/logout', authUser, logout)

export default userRouter