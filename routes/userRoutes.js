import express from "express"
import { Router } from "express"
import { register, login, getUser, forgetPassword } from '../controller/userController.js'
import apiLimiter from "../middleware/apiLimiter.js"
const router = Router()
apiLimiter
router.post('/register', apiLimiter, register)
router.post('/login',apiLimiter, login)
router.get('/profile',apiLimiter, getUser)
router.post('/forgetPassword',apiLimiter, forgetPassword)


export default router