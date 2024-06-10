import { Role, Status } from '@prisma/client';
import { z } from 'zod';

export const userInfoPayload = z
  .object({
    role: z.nativeEnum(Role),
    status: z.nativeEnum(Status),
  })
  .partial();

export type userInfoPayload = z.infer<typeof userInfoPayload>;
