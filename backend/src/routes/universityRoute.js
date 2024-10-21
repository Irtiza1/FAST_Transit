import express from 'express';
import {getAllUniversity} from '../controller/universityController.js';
const router = express.Router();

router.get('/',getAllUniversity)

export default router;