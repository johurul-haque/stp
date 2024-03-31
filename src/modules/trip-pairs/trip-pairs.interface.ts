import { z } from 'zod';
import { travelPairResponsePayload } from './trip-pairs.validation';

export type TravelPairResponsePayload = z.infer<
  typeof travelPairResponsePayload
>;
