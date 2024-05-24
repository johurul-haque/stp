import { validateRequest } from '@/middlewares/validate-request';
import { verifyToken } from '@/middlewares/verify-token';
import { Router } from 'express';
import {
  getUserProfile,
  handleDeleteProfile,
  handleProfileUpdate,
  loginUser,
  registerUser,
} from './user.controller';
import {
  deleteProfilePayload,
  loginPayload,
  registerPayload,
  updateUserProfilePayload,
} from './user.validation';

const router = Router();

router.post('/register', validateRequest(registerPayload), registerUser);
router.post('/login', validateRequest(loginPayload), loginUser);

router.get('/profile', verifyToken(), getUserProfile);
router.put(
  '/profile',
  [verifyToken(), validateRequest(updateUserProfilePayload)],
  handleProfileUpdate
);
router.delete(
  '/profile',
  [verifyToken(), validateRequest(deleteProfilePayload)],
  handleDeleteProfile
);

export const UserRoutes = router;
