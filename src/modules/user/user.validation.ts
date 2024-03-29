import { hashPassword } from '@/utils/hash-password';
import { z } from 'zod';

export const registerPayload = z.object({
  name: z.string({ required_error: 'Name field is required.' }),
  email: z
    .string({ required_error: 'Email must be a valid email address.' })
    .email({ message: 'Email must be a valid email address.' }),
  password: z
    .string({ required_error: 'Password field is required.' })
    .transform(hashPassword),
  profile: z.object(
    {
      bio: z.string({ required_error: 'Bio field is required.' }),
      age: z.number({ required_error: 'Age field is required.' }),
    },
    { required_error: 'Profile field is required.' }
  ),
});
