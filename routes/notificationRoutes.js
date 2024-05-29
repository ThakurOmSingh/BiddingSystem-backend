import express from "express"
import { Router } from "express"
import { getNotifications, markNotificationsRead } from '../controller/notificationsController.js'
import { authorization } from "../middleware/authorization.js";
import apiLimiter from "../middleware/apiLimiter.js";
const router = Router()
apiLimiter
router.get('/', authorization, apiLimiter, getNotifications);
router.post('/mark-read', authorization, apiLimiter, markNotificationsRead);


export default router