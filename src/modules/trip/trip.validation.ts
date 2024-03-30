import { z } from 'zod';

function requiredError(fieldName: string) {
  return { required_error: `${fieldName} field is required` };
}

export const createTripPayload = z.object({
  destination: z.string(requiredError('Destination')),
  startDate: z.string(requiredError('StartDate')),
  endDate: z.string(requiredError('EndDate')),
  budget: z.number(requiredError('Budget')),
  activities: z.string(requiredError('Activities')).array(),
});

export const tripPairRequestPayload = z.object({
  userId: z.string().uuid(),
});