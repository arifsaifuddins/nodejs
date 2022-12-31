import express from "express"
import { userLogin, userRegister } from "../controllers/user.js"

export const userRouter = express.Router()

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)