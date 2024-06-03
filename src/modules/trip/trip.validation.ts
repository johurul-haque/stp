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
    .transform(convertDateTime),
  endDate: z
    .string(requiredError('endDate'))
    .datetime()
    .transform(convertDateTime),
});

export const updateTripPayload = createTripPayload.partial();
export type updateTripPayload = z.infer<typeof updateTripPayload>;

export const tripPairRequestPayload = z.object({
  userId: z.string().uuid(),
});

function convertDateTime(value: string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() + offset).toISOString();
}
