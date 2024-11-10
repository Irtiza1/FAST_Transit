import express from 'express';
const router = express.Router();
// import {getAllUniversity} from '../controller/AdminController.js';
import { LoginAdmin } from "../controller/admin/AdminLoginController.js";
import { PostNotification } from "../controller/NotificationController.js"
import { viewStats } from '../controller/admin/StatsController.js';
// router.get('/',getAllUniversity)
// router.get('/University', someAdminRoute )

router.post('/login',LoginAdmin)
router.post('/notifications/:token',PostNotification)
router.get('/viewStats',viewStats)

export default router;