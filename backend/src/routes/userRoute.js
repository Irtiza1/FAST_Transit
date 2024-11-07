import express from "express";
const router=express.Router()
import {SignUpUser} from '../controller/user/SignUpUserController.js'
import {ActivateUser} from '../controller/user/ActivateUserController.js'
import { LoginUser } from "../controller/user/userLoginUserController.js";
import {authorizeRole} from '../middleware/AuthorizeRoleMiddleware.js'
import { someFacultyRoute } from "../controller/user/FacultyController.js";
import { someStudentRoute } from "../controller/user/StudentController.js";
import { someDriverRoute } from "../controller/user/DriverController.js";
import { someVendorRoute } from "../controller/user/VendorController.js";

router.post('/signup',SignUpUser)
router.get('/activate/:token/:role',ActivateUser)
router.post('/login',LoginUser)

//-----Role Based Access-----
router.get('/Student', authorizeRole('Student'), someStudentRoute )
router.get('/Faculty', authorizeRole('Faculty'), someFacultyRoute )
router.get('/Driver', authorizeRole('Driver'), someDriverRoute )
router.get('/Vendor', authorizeRole('Vendor'), someVendorRoute )
export default router;