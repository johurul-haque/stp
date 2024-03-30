import { TravelPairRequestStatus } from '@prisma/client';
import { z } from 'zod';

export const travelPairResponsePayload = z.object({
  status: z.nativeEnum(TravelPairRequestStatus),
});
