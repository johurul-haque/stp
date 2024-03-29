import { Router } from 'express';
import { TripRoutes } from './modules/trip/trip.route';
import { UserRoutes } from './modules/user/user.route';

const router = Router();

router.use('/', [UserRoutes, TripRoutes]);

export default router;
