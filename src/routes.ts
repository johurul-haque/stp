import { Router } from 'express';
import { TripPairsRoutes } from './modules/trip-pairs/trip-pairs.route';
import { TripRoutes } from './modules/trip/trip.route';
import { UserRoutes } from './modules/user/user.route';

const router = Router();

router.use('/', [UserRoutes, TripRoutes]);
router.use('/travel-buddies', TripPairsRoutes);

export default router;
