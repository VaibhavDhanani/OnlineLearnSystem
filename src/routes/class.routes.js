import { Router } from "express";
import { deleteClass, getClass, insertClass, updateClass } from "../controller/class.controller.js";

const router = Router();

router.route('/class')
    .get(getClass)
    .post(insertClass)

router.route('/class/update/:id')
    .put(updateClass)

router.route('/class/delete/:id')
    .delete(deleteClass);

export default router;

