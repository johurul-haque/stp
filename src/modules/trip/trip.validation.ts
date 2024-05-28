import { z } from 'zod';

function requiredError(fieldName: string) {
  return { required_error: `${fieldName} field is required` };
}

export const createTripPayload = z.object({
  destination: z.string(requiredError('destination')),
  description: z
    .string()
    .min(40, 'Description must be at least 40 characters.')
    .max(400, 'Description must be at in-between 400 characters.'),
  images: z.string().url().array(),
  travelType: z.string(),
  startDate: z
    .string(requiredError('startDate'))
    .datetime()
    .transform(toUTCString),
  endDate: z.string(requiredError('endDate')).datetime().transform(toUTCString),
});

export const tripPairRequestPayload = z.object({
  userId: z.string().uuid(),
});

function toUTCString(value: string) {
  return new Date(value).toUTCString();
}