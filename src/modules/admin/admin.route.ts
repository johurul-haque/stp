import { verifyToken } from '@/middlewares/verify-token';
import { Router } from 'express';
import { handleGetAllUsers, handleInfoChange } from './admin.controller';

const router = Router();

router.get('/manage-users', verifyToken('ADMIN'), handleGetAllUsers);
router.patch('/manage-users/:userId', verifyToken('ADMIN'), handleInfoChange);

export const AdminRoutes = router;
