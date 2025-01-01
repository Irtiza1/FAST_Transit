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
// router.get('/',getAllUniversity)
// router.get('/University', someAdminRoute )

import { vendorDropDownCreate } from '../controller/admin/vendor/VendorDropDownCreateController.js';
import { vendorDropDownUpdate } from '../controller/admin/vendor/VendorDropDownUpdateController.js';
import { vendorDropDownView } from '../controller/admin/vendor/VendorDropDownViewController.js';
import { vendorDropDownDelete } from '../controller/admin/vendor/VendorDropDownDeleteController.js';
import { LoginVendor } from '../controller/admin/vendor/VendorLoginController.js';
//login admin
router.post('/login',LoginAdmin)
//post notification
router.post('/notifications/:token',PostNotification)
//viewStats directly showing everytime
router.get('/viewStats',viewStats)
//admin signup vendor
router.post('/vendorlogin',LoginVendor)
router.get('/activate/:token/:role',ActivateUser)

//view profile
router.get('/profile',viewProfile)

//Univeristy admin dropdown
router.get("/dropdown/:operations/:user/:id?", adminDropDownView);
router.post("/dropdown/:operations/:user",adminDropDownCreate)
router.delete("/dropdown/:operations/:user/:id?",adminDropDownDelete)
router.patch("/dropdown/:operations/:user",vendorDropDownUpdate)

//Vendor admin dropdown
router.get("/Vendor/dropdown/:operations/:user/:id?", vendorDropDownView);
router.post("/Vendor/dropdown/:operations/:user",vendorDropDownCreate)
router.delete("/Vendor/dropdown/:operations/:user/:id?",vendorDropDownDelete)
router.patch("/Vendor/dropdown/:operations/:user",vendorDropDownUpdate)
export default router;