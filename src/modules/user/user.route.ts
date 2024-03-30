import { validateRequest } from '@/middlewares/validate-request';
import { verifyToken } from '@/middlewares/verify-token';
import { Router } from 'express';
import { getUserProfile, loginUser, registerUser } from './user.controller';
import { loginPayload, registerPayload } from './user.validation';

const router = Router();

router.post('/register', validateRequest(registerPayload), registerUser);
router.post('/login', validateRequest(loginPayload), loginUser);
router.get('/profile', verifyToken, getUserProfile);

export const UserRoutes = router;
