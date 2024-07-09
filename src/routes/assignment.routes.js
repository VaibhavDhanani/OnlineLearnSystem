import {Router} from 'express';
import { deleteAssignment, getAssignments, insertAssignment, updateAssignment } from '../controller/assignment.controller.js';
import authenticateToken from '../middlewares/auth.middleware.js';

const router = Router();
router.use(authenticateToken)

router.route('/:class').get(getAssignments);
router.route('/:class/insert').post(insertAssignment);
router.route('/:class/update').put(updateAssignment);
router.route('/:class/delete').delete(deleteAssignment);

export default router;