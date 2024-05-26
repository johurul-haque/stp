import { z } from 'zod';

export const createTripFormSchema = z.object({
  destination: z.string(),
  description: z.string(),
  travel_type: z.string(),
  date: z.object(
    {
      from: z.date(requiredErr('start date.')),
      to: z.date(requiredErr('end date.')),
    },
    requiredErr('start and end date.')
  ),
  image: z.instanceof(FileList),
});

export type createTripFormSchema = z.infer<typeof createTripFormSchema>;

function requiredErr(value: string) {
  return {
    required_error: `Please select ${value}` as const,
  };
}
