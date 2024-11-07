import express from 'express';
const router = express.Router();
// import {getAllUniversity} from '../controller/AdminController.js';
import { someAdminRoute } from "../controller/AdminController.js";
import {SignUpUser} from '../controller/user/SignUpUserController.js'
import {ActivateUser} from '../controller/user/ActivateUserController.js'
import { LoginUser } from "../controller/user/userLoginUserController.js";
// router.get('/',getAllUniversity)
// router.get('/University', someAdminRoute )

router.post('/signup',SignUpUser)
router.get('/activate/:token/:role',ActivateUser)
router.post('/login',LoginUser)
export default router;