import { z } from 'zod';
import { createTripPayload } from './trip.validation';

export type CreateTripPayload = z.infer<typeof createTripPayload>;
