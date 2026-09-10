import express from "express";
import {getAll, login, signIn } from "../controllers/Advertiser.js";

const router = express.Router()

router.get('',getAll)
router.post('/signIn',signIn)
router.post('/login',login)




export default router