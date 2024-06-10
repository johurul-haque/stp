import { validateRequest } from '@/middlewares/validate-request';
import { verifyToken } from '@/middlewares/verify-token';
import { Router } from 'express';
import {
  getUserProfile,
  handleDeleteProfile,
  handleGetAllSentRequests,
  handleProfileUpdate,
  handleResetPassword,
  loginUser,
  registerUser,
} from './user.controller';
import {
  deleteProfilePayload,
  loginPayload,
  registerPayload,
  resetPasswordPayload,
  updateUserProfilePayload,
} from './user.validation';

const router = Router();

router.post('/register', validateRequest(registerPayload), registerUser);
router.post('/login', validateRequest(loginPayload), loginUser);
router.post(
  '/reset-password',
  [verifyToken(), validateRequest(resetPasswordPayload)],
  handleResetPassword
);

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

router.get('/sent-requests', [verifyToken()], handleGetAllSentRequests);

export const UserRoutes = router;
