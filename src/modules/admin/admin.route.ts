import { Router } from 'express';
import { handleGetAllUsers, handleInfoChange } from './admin.controller';

const router = Router();

router.get('/manage-users', handleGetAllUsers);
router.patch('/manage-users/:userId', handleInfoChange);

export const AdminRoutes = router;
