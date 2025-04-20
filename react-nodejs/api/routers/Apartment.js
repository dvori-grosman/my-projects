import express from "express";
import { create, getAll, getByCodeAdvertiser, getByCodeCategory, getByCodeCity, getByCountBeds, getById, getByPrice , remove, update } from "../controllers/Apartment.js";
import {  checkCodeExsist,checkAuth, upload } from "../middlewares.js";

const router=express.Router()
router.get('',getAll)
router.get('/:id',getById)
router.get('/category/:codeCategory',getByCodeCategory)
router.get('/advertiser/:codeAdvertiser',getByCodeAdvertiser)
router.get('/city/:codeCity',getByCodeCity)
router.get('/num/:min/:max',getByCountBeds)
router.get('/price/:min/:max',getByPrice)
//  upload.single('image'),
router.post('',upload.single('image'),checkAuth,create)
router.get('',upload.single('image'),create)
router.delete('/:id/:codeAdvertiser',checkAuth,checkCodeExsist,remove)
router.patch('/:id/:code',checkAuth ,checkCodeExsist,update)

export default router