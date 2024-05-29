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

export const tripPairRequestPayload = z.object({
  userId: z.string().uuid(),
});

function convertDateTime(value: string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() + offset).toISOString();
}

export function queryValidator() {
  return z
    .object({
      destination: z.string(),
      startDate: z
        .string()
        .refine(isValidDate, 'startDate must be in YYYY-MM-DD format'),
      endDate: z
        .string()
        .refine(isValidDate, 'endDate must be in YYYY-MM-DD format'),
    })
    .partial();
}

function isValidDate(value: string) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(value)) return false;

  const [year, month, day] = value.split('-').map(Number);

  if (month < 1 || month > 12) return false;

  const daysInMonth = new Date(year, month, 0).getDate();

  if (day < 1 || day > daysInMonth) return false;

  return true;
}