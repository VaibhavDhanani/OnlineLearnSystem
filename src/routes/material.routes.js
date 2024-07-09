import { Router } from "express";
import {insertMaterial,  deleteMaterial, getMaterial, updateMaterial } from "../controller/material.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const router = Router();
router.use(authenticateToken)
router.route('/').post(insertMaterial).get(getMaterial)
router.route('/update/:id').put(updateMaterial)
router.route('/delete/:id').delete(deleteMaterial)

export default router;