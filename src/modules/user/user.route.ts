import { validateRequest } from '@/middlewares/validate-request';
import { Router } from 'express';
import { registerUser } from './user.controller';
import { registerPayload } from './user.validation';

const router = Router();

router.post('/register', validateRequest(registerPayload), registerUser);

export const UserRoutes = router;
