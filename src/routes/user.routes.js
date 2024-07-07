import { Router } from "express";
import { deleteUser, getUser, insertUser } from "../controller/user.controller.js";

const router = Router();

router.route("/user").get(getUser);
router.route("/user").post(insertUser);
router.route("/user/:id").delete(deleteUser);

export default router;