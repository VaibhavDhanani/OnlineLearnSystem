import { Router } from "express";
import { deleteUser, getUser, insertUser, validateUser } from "../controller/user.controller.js";

const router = Router();

router.route("/").get(getUser);
router.route("/").post(insertUser);
router.route("/:id").delete(deleteUser);
router.route("/validate").post(validateUser);

export default router;