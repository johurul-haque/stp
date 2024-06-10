import { z } from 'zod';

export const changePasswordForm = z
  .object({
    current_password: z
      .string()
      .trim()
      .min(4, 'Password must be at least 4 characters.'),
    new_password: z
      .string()
      .trim()
      .min(4, 'Password must be at least 4 characters.'),
    confirm_new_password: z
      .string()
      .trim()
      .min(4, 'Password must be at least 4 characters.'),
  })
  .refine((data) => data.confirm_new_password === data.new_password, {
    message: "Password doesn't match with your new password.",
    path: ['confirm_new_password'],
  })
  .refine((data) => data.current_password !== data.new_password, {
    message: "New password can't be the same as current password.",
    path: ['new_password'],
  });

export type changePasswordForm = z.infer<typeof changePasswordForm>;
