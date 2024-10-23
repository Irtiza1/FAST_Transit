import express from "express";
const router=express.Router()
import {SignUpUser} from '../controller/SignUpUserController.js'
import {ActivateUser} from '../controller/ActivateUserController.js'
router.post('/signup',SignUpUser)
router.get('/activate/:token',ActivateUser)

export default router;