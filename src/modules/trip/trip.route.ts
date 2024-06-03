import { validateRequest } from '@/middlewares/validate-request';
import { verifyToken } from '@/middlewares/verify-token';
import { Router } from 'express';
import {
  createTrip,
  handleGetAllTrips,
  handleTripDelete,
  handleTripPairRequest,
} from './trip.controller';
import { createTripPayload, tripPairRequestPayload } from './trip.validation';

const router = Router();

router.get('/', [verifyToken(undefined, true)], handleGetAllTrips);

router.post(
  '/',
  [verifyToken(), validateRequest(createTripPayload)],
  createTrip
);

router.post(
  '/:tripId/request',
  [verifyToken(), validateRequest(tripPairRequestPayload)],
  handleTripPairRequest
);

router.delete('/:tripId', [verifyToken()], handleTripDelete);

export const TripRoutes = router;
