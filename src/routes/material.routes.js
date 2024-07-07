import { Router } from "express";
import {insertMaterial,  deleteMaterial, getMaterial, updateMaterial } from "../controller/material.controller.js";

const router = Router();

router.route('/').post(insertMaterial).get(getMaterial)
router.route('/update/:id').put(updateMaterial)
router.route('/delete/:id').delete(deleteMaterial)

export default router;