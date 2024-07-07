import { Router } from "express";
import { deleteLesson, getLessons, insertLesson, updateLesson } from "../controller/lesson.controller.js";

const router = Router();

router.route("/").get(getLessons).post(insertLesson)
router.route("/update/:id").put(updateLesson);
router.route("/delete/:id").delete(deleteLesson);

export default router;