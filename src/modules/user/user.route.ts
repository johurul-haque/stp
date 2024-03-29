import { validateRequest } from '@/middlewares/validate-request';
import { Router } from 'express';
import { loginUser, registerUser } from './user.controller';
import { loginPayload, registerPayload } from './user.validation';

const router = Router();

router.post('/register', validateRequest(registerPayload), registerUser);
router.post('/login', validateRequest(loginPayload), loginUser);

export const UserRoutes = router;
