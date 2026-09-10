import express from "express";
import { create} from "../controllers/City.js";
import getAll from '../controllers/City.js'
import { checkAuth } from "../middlewares.js";


const router=express.Router()

router.get('',getAll)
router.post('',checkAuth, create)

export default router
