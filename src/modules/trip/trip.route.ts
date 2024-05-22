import { validateRequest } from '@/middlewares/validate-request';
import { verifyToken } from '@/middlewares/verify-token';
import { Router } from 'express';
import {
  createTrip,
  handleGetAllTrips,
  handleTripPairRequest,
} from './trip.controller';
import { createTripPayload, tripPairRequestPayload } from './trip.validation';

const router = Router();

router.get('/trips', handleGetAllTrips);

router.post(
  '/trips',
  [verifyToken, validateRequest(createTripPayload)],
  createTrip
);

router.post(
  '/trip/:tripId/request',
  [verifyToken, validateRequest(tripPairRequestPayload)],
  handleTripPairRequest
);

export const TripRoutes = router;
