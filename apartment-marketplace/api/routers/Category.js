import express from "express";
import { create, getAll } from "../controllers/Category.js";
import { checkAuth } from "../middlewares.js";


const router=express.Router()

router.get('',getAll)
router.post('',checkAuth, create)

export default router
