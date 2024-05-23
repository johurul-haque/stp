import { hashPassword } from '@/utils/hash-password';
import { z } from 'zod';

function requiredError(fieldName: string) {
  return { required_error: `${fieldName} field is required` };
}

export const registerPayload = z.object({
  name: z.string(requiredError('Name')),
  email: z
    .string({ required_error: 'Email must be a valid email address.' })
    .email({ message: 'Email must be a valid email address.' }),
  password: z.string(requiredError('Password')).transform(hashPassword),
  profile: z.object(
    {
      bio: z.string(requiredError('Bio')),
      age: z.number(requiredError('Age')),
    },
    requiredError('Profile')
  ),
});

export const loginPayload = z
  .object({
    email: z.string().email().optional(),
    username: z.string().optional(),
    password: z.string(requiredError('Password')),
  })
  .refine(({ username, email }) => username || email, {
    message: 'Either username or email must be provided',
  });

export const jwtPayload = z.object({
  userId: z.string().uuid(),
});

export const updateUserProfilePayload = z
  .object({
    name: z.string(),
    email: z.string().email(),
  })
  .partial();