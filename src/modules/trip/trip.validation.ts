import { z } from 'zod';

function requiredError(fieldName: string) {
  return { required_error: `${fieldName} field is required` };
}

export const createTripPayload = z.object({
  destination: z.string(requiredError('Destination')),
  description: z
    .string()
    .min(40, 'Description must be at least 40 characters.')
    .max(400, 'Description must be at in-between 400 characters.'),
  images: z.string().url().array(),
  travelType: z.string(),
  startDate: z.string(requiredError('StartDate')),
  endDate: z.string(requiredError('EndDate')),
});

export const tripPairRequestPayload = z.object({
  userId: z.string().uuid(),
});