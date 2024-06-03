import { z } from 'zod';
import { createTripFormSchema } from '../../../../create/_components/form/schema';

export const updateTripFormSchema = createTripFormSchema.partial({images: true});
export type updateTripFormSchema = z.infer<typeof updateTripFormSchema>;
