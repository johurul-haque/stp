import { z } from 'zod';

const usernameRegex = /^(?![_-])(?!.*[_-]{2})[a-zA-Z0-9_-]{3,30}(?<![_-])$/;

export const registerSchema = z
  .object({
    username: z.string().trim().regex(usernameRegex, 'Invalid username.'),
    email: z.string().email(),
    password: z
      .string()
      .trim()
      .min(4, 'Password must be at least 4 characters.'),
    confirm_password: z
      .string()
      .trim()
      .min(4, 'Password must be at least 4 characters.'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password doesn't match",
    path: ['confirm_password'],
  });

export type registerSchema = z.infer<typeof registerSchema>;
