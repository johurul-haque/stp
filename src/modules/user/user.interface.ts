import { z } from 'zod';
import { registerPayload } from './user.validation';

export type RegisterPayload = z.infer<typeof registerPayload>;
