import express from 'express';
const router = express.Router();
// import {getAllUniversity} from '../controller/AdminController.js';
import { LoginAdmin } from "../controller/admin/AdminLoginController.js";
import { PostNotification } from "../controller/NotificationController.js"
import { viewStats } from '../controller/admin/StatsController.js';
import {SignUpUser} from '../controller/user/SignUpUserController.js'
import {ActivateUser} from '../controller/user/ActivateUserController.js'
// import { LoginUser } from "../controller/user/userLoginUserController.js";
import { viewProfile } from '../controller/admin/ViewProfileController.js';
import { adminDropDown } from '../controller/admin/AdminDropDownController.js';
import { adminDropDownCreate } from '../controller/admin/AdminDropDownCreateController.js';
import { adminDropDownDelete } from '../controller/admin/AdminDropDownDeleteController.js';
// router.get('/',getAllUniversity)
// router.get('/University', someAdminRoute )


//login admin
router.post('/login',LoginAdmin)
//post notification
router.post('/notifications/:token',PostNotification)
//viewStats directly showing everytime
router.get('/viewStats',viewStats)
//admin signup vendor
router.post('/vendorsignup',SignUpUser)
router.get('/activate/:token/:role',ActivateUser)

//view profile
router.get('/profile',viewProfile)

//admin dropdown
router.get("/dropdown/:operations/:user/:id?", adminDropDown);
router.post("/dropdown/:operations/:user",adminDropDownCreate)
router.delete("/dropdown/:operations/:user/:id?",adminDropDownDelete)
//add vendor  

export default router;