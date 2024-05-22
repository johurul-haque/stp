import { z } from 'zod';

export const loginSchema = z.object({
  handle: z.string(),
  password: z.string().trim().min(4, 'Password must be at least 4 characters.'),
});

export type loginSchema = z.infer<typeof loginSchema>;
