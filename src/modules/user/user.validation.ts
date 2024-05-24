import { hashPassword } from '@/utils/hash-password';
import { Role } from '@prisma/client';
import { z } from 'zod';

function requiredError(fieldName: string) {
  return { required_error: `${fieldName} field is required` };
}

export const registerPayload = z.object({
  username: z.string(requiredError('Username')),
  email: z
    .string({ required_error: 'Email must be a valid email address.' })
    .email({ message: 'Email must be a valid email address.' }),
  password: z.string(requiredError('Password')).transform(hashPassword),
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
  role: z.nativeEnum(Role)
});

export const updateUserProfilePayload = z
  .object({
    username: z.string(),
    email: z.string().email(),
  })
  .partial()
  .refine(({ username, email }) => username || email, {
    message: 'Nothing to update',
  });

export const deleteProfilePayload = z.object({
  password: z.string(),
});