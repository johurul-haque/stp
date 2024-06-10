import { validateRequest } from '@/middlewares/validate-request';
import { verifyToken } from '@/middlewares/verify-token';
import { Router } from 'express';
import {
  createTrip,
  handleGetAllTrips,
  handleGetPopularTrips,
  handleGetSingleTrip,
  handleTripDelete,
  handleTripJoinRequest,
  handleTripUpdate,
} from './trip.controller';
import { createTripPayload, updateTripPayload } from './trip.validation';

const router = Router();

router.post(
  '/',
  [verifyToken(), validateRequest(createTripPayload)],
  createTrip
);

router.get('/', [verifyToken(undefined, true)], handleGetAllTrips);
router.get('/popular', handleGetPopularTrips);
router.get('/:tripId', [verifyToken(undefined, true)], handleGetSingleTrip);

router.patch(
  '/:tripId',
  [verifyToken(), validateRequest(updateTripPayload)],
  handleTripUpdate
);

router.post('/:tripId/request', [verifyToken()], handleTripJoinRequest);

router.delete('/:tripId', [verifyToken()], handleTripDelete);

export const TripRoutes = router;
