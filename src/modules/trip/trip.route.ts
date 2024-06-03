import { validateRequest } from '@/middlewares/validate-request';
import { verifyToken } from '@/middlewares/verify-token';
import { Router } from 'express';
import {
  createTrip,
  handleGetAllTrips,
  handleGetSingleTrip,
  handleTripDelete,
  handleTripPairRequest,
  handleTripUpdate,
} from './trip.controller';
import {
  createTripPayload,
  tripPairRequestPayload,
  updateTripPayload,
} from './trip.validation';

const router = Router();

router.post(
  '/',
  [verifyToken(), validateRequest(createTripPayload)],
  createTrip
);

router.get('/', [verifyToken(undefined, true)], handleGetAllTrips);
router.get('/:tripId', [verifyToken(undefined, true)], handleGetSingleTrip);

router.patch(
  '/:tripId',
  [verifyToken(), validateRequest(updateTripPayload)],
  handleTripUpdate
);

router.post(
  '/:tripId/request',
  [verifyToken(), validateRequest(tripPairRequestPayload)],
  handleTripPairRequest
);

router.delete('/:tripId', [verifyToken()], handleTripDelete);

export const TripRoutes = router;
