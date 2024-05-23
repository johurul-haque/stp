import { z } from 'zod';

const regex = /^(?![_-])(?!.*[_-]{2})[a-zA-Z0-9_-]{3,30}(?<![_-])$/;

export const registerSchema = z
  .object({
    username: z.string().trim().regex(regex, 'Invalid username.'),
    email: z.string().email(),
    password: z.string().trim().min(4),
    confirm_password: z.string().trim().min(4),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password doesn't match",
    path: ['confirm_password'],
  });

export type registerSchema = z.infer<typeof registerSchema>;
