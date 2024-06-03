import { z } from 'zod';

const usernameRegex = /^(?![_-])(?!.*[_-]{2})[a-zA-Z0-9_-]{3,30}(?<![_-])$/;

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: 'Username must be at least 4 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    })
    .regex(usernameRegex, 'Invalid username.'),
  email: z
    .string({
      required_error: 'Invalid email address.',
    })
    .email(),
});

export type profileFormSchema = z.infer<typeof profileFormSchema>;
