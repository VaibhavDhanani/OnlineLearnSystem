import { Router } from "express";
import { deleteUser, getUser, insertUser, validateUser } from "../controller/user.controller.js";

const router = Router();

router.route("/user").get(getUser);
router.route("/user").post(insertUser);
router.route("/user/:id").delete(deleteUser);
router.route("/user/validate").post(validateUser);

export default router;