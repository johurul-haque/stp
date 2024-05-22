import { z } from 'zod';
import { createTripPayload, tripPairRequestPayload } from './trip.validation';

export type CreateTripPayload = z.infer<typeof createTripPayload>;
export type TripPairRequestPayload = z.infer<typeof tripPairRequestPayload>;