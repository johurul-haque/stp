import { Router } from 'express';
import { verifyToken } from './middlewares/verify-token';
import { AdminRoutes } from './modules/admin/admin.route';
import { TripPairsRoutes } from './modules/trip-pairs/trip-pairs.route';
import { TripRoutes } from './modules/trip/trip.route';
import { UserRoutes } from './modules/user/user.route';

const router = Router();

router
  .use('/', [UserRoutes, AdminRoutes])
  .use('/trips', TripRoutes)
  .use('/travel-buddies', TripPairsRoutes);

export default router;
