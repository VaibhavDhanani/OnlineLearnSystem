import {Router} from 'express';
import { deleteAssignment, getAssignments, insertAssignment, updateAssignment } from '../controller/assignment.controller.js';
import authenticateToken from '../middlewares/auth.middleware.js';

const router = Router();
// router.use(authenticateToken)

router.route('/:subject').get(getAssignments);
router.route('/insert').post(insertAssignment);
router.route('/:subject/update').put(updateAssignment);
router.route('/:subject/delete').delete(deleteAssignment);

export default router;