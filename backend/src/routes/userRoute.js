import express from "express";
const router=express.Router()
import {SignUpUser} from '../controller/SignUpUserController.js'
import {ActivateUser} from '../controller/ActivateUserController.js'
import { LoginUser } from "../controller/userLoginUserController.js";
import {authorizeRole} from '../middleware/AuthorizeRoleMiddleware.js'
import { someFacultyRoute } from "../controller/FacultyController.js";
import { someStudentRoute } from "../controller/StudentController.js";
import { someDriverRoute } from "../controller/DriverController.js";
router.post('/signup',SignUpUser)
router.get('/activate/:token',ActivateUser)
router.post('/login',LoginUser)
router.get('/Student', authorizeRole('Student'), someStudentRoute )
router.get('/Faculty', authorizeRole('Faculty'), someFacultyRoute )
router.get('/Driver', authorizeRole('Driver'), someDriverRoute )
export default router;