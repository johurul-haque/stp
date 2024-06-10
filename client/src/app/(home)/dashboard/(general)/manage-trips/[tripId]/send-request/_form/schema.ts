import { z } from 'zod';

export const formSchema = z.object({
  email: z.string(),
  username: z.string(),
  joiningReason: z.string(),
  tAndC: z.boolean(),
});

export type formSchema = z.infer<typeof formSchema>;
