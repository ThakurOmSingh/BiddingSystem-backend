import express from "express"
import { Router } from "express"
import { register, login, getUser, forgetPassword } from '../controller/userController.js'
import apiLimiter from "../middleware/apiLimiter.js"
import { authorization } from "../middleware/authorization.js"
const router = Router()

router.post('/register', apiLimiter, register)
router.post('/login',apiLimiter, login)
router.get('/profile',apiLimiter, getUser)
router.post('/forgetPassword',apiLimiter,authorization , forgetPassword)


export default router
