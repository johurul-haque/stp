import { validateRequest } from '@/middlewares/validate-request';
import { verifyToken } from '@/middlewares/verify-token';
import { Router } from 'express';
import { createTrip } from './trip.controller';
import { createTripPayload } from './trip.validation';

const router = Router();

router.post(
  '/trips',
  [verifyToken, validateRequest(createTripPayload)],
  createTrip
);

export const TripRoutes = router;
