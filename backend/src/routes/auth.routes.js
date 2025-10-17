import express from 'express';
import "dotenv/config";
import { signup } from '../controllers/auth.controller';

const router = express.Router();

router.post("/signup", signup);


export default router;