import { TravelPairRequestStatus } from '@prisma/client';
import { z } from 'zod';

export const travelPairResponsePayload = z.object({
  tripId: z.string().uuid(),
  status: z.nativeEnum(TravelPairRequestStatus),
});
