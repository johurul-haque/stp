import { validateRequest } from '@/middlewares/validate-request';
import { verifyToken } from '@/middlewares/verify-token';
import { Router } from 'express';
import { createTrip } from './trip.controller';
import { createTripPayload, tripPairRequestPayload } from './trip.validation';

const router = Router();

router.post(
  '/trips',
  [verifyToken, validateRequest(createTripPayload)],
  createTrip
);

router.post('/trip/:tripId/request', [
  verifyToken,
  validateRequest(tripPairRequestPayload),
]);

export const TripRoutes = router;
