import { validateRequest } from '@/middlewares/validate-request';
import { verifyToken } from '@/middlewares/verify-token';
import { Router } from 'express';
import {
  getUserProfile,
  handleProfileUpdate,
  loginUser,
  registerUser,
} from './user.controller';
import {
  loginPayload,
  registerPayload,
  updateUserProfilePayload,
} from './user.validation';

const router = Router();

router.post('/register', validateRequest(registerPayload), registerUser);
router.post('/login', validateRequest(loginPayload), loginUser);

router.get('/profile', verifyToken, getUserProfile);
router.put(
  '/profile',
  [verifyToken, validateRequest(updateUserProfilePayload)],
  handleProfileUpdate
);

export const UserRoutes = router;
