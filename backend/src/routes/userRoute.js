import express from "express";
const router=express.Router()
import {SignUpUser} from '../controller/user/SignUpUserController.js'
import {ActivateUser} from '../controller/user/ActivateUserController.js'
import { LoginUser } from "../controller/user/userLoginUserController.js";
import {authorizeRole} from '../middleware/AuthorizeRoleMiddleware.js'

import { driverDropDownCreate } from "../controller/user/driver/DriverDropDownCreateController.js";
import { driverDropDownUpdate } from "../controller/user/driver/DriverDropDownUpdateController.js";
import { driverDropDownView } from "../controller/user/driver/DriverDropDownViewController.js"

import { studentDropDownCreate } from "../controller/user/student/StudentDropDownCreateController.js";
import { studentDropDownUpdate } from "../controller/user/student/StudentDropDownUpdateController.js";
import { studentDropDownView } from "../controller/user/student/StudentDropDownViewController.js";

import { facultyDropDownCreate } from "../controller/user/faculty/FacultyDropDownCreateController.js";
import { facultyDropDownView } from "../controller/user/faculty/FacultyDropDownViewController.js";
import { facultyDropDownUpdate } from "../controller/user/faculty/FacultyDropDownUpdateController.js";
//signup /login /activate user
router.post('/signup',SignUpUser)
router.get('/activate/:token/:role',ActivateUser)
router.post('/login',LoginUser)

//-----Role Based Access-----
router.post('/Student', /*authorizeRole('Student'),*/ studentDropDownCreate )
router.patch('/Student', /*authorizeRole('Student'),*/ studentDropDownUpdate )
router.get('/Student/dropdown/:operations/:user/:id?', /*authorizeRole('Student'),*/  studentDropDownView)

router.post('/Faculty', /*authorizeRole('Faculty'),*/ facultyDropDownCreate)
router.patch('/Faculty', /*authorizeRole('Faculty'),*/ facultyDropDownUpdate )
router.get('/Faculty', /*authorizeRole('Faculty'),*/  facultyDropDownView)

//  authorizeRole('Driver'), 
router.post('/Driver/dropdown/:operations/:user', /*authorizeRole('Driver'),*/ driverDropDownCreate)
router.patch('/Driver/dropdown/:operations/:user', /*authorizeRole('Driver'),*/ driverDropDownUpdate)
router.get('/Driver/dropdown/:operations/:user/:id?', /*authorizeRole('Driver'),*/  driverDropDownView)

export default router;