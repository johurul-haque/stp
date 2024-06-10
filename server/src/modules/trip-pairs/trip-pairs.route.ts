import { validateRequest } from '@/middlewares/validate-request';
import { verifyToken } from '@/middlewares/verify-token';
import { Router } from 'express';
import { getTravelPairs, handleTravelPairResponse } from './trip-pairs.controller';
import { travelPairResponsePayload } from './trip-pairs.validation';

const router = Router();

router.get('/:tripId', verifyToken(), getTravelPairs);
router.put(
  '/:buddyId/respond',
  [verifyToken(), validateRequest(travelPairResponsePayload)],
  handleTravelPairResponse
);

export const TripPairsRoutes = router;
