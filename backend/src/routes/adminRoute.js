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
import { adminDropDownView } from '../controller/admin/AdminDropDownViewController.js';
import { adminDropDownCreate } from '../controller/admin/AdminDropDownCreateController.js';
import { adminDropDownDelete } from '../controller/admin/AdminDropDownDeleteController.js';
import { adminDropDownUpdate } from '../controller/admin/AdminDropDownUpdateController.js';
// import { viewStats } from '../controller/admin/StatsController.js';
// import { viewProfile } from '../controller/admin/ViewProfileController.js';
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
router.get("/dropdown/:operations/:user/:id?", adminDropDownView);
router.post("/dropdown/:operations/:user",adminDropDownCreate)
router.delete("/dropdown/:operations/:user/:id?",adminDropDownDelete)
router.patch("/dropdown/:operations/:user",adminDropDownUpdate)
router.get("/viewStats", viewStats );//add in view controller
router.get("/viewProfile", viewProfile );//add in view controller
//add vendor  

export default router;