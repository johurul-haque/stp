import { z } from 'zod';
import {
  deleteProfilePayload,
  jwtPayload,
  loginPayload,
  registerPayload,
  updateUserProfilePayload,
} from './user.validation';

export type RegisterPayload = z.infer<typeof registerPayload>;
export type LoginPayload = z.infer<typeof loginPayload>;
export type JWTPayload = z.infer<typeof jwtPayload>;
export type UpdateUserProfilePayload = z.infer<typeof updateUserProfilePayload>;
export type deleteProfilePayload = z.infer<typeof deleteProfilePayload>;