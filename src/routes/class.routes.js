import { Router } from "express";
import { deleteClass, getClass, insertClass, updateClass } from "../controller/class.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const router = Router();
router.use(authenticateToken)
router.route('/')
    .get(getClass)
    .post(insertClass)

router.route('/update/:id')
    .put(updateClass)

router.route('/delete/:id')
    .delete(deleteClass);

export default router;
