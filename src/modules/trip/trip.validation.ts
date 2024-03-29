import { z } from 'zod';

export const createTripPayload = z.object({
  destination: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number(),
  activities: z.string().array(),
});
