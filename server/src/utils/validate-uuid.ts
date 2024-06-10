import { z } from 'zod';

export const uuid = z.string().uuid();
