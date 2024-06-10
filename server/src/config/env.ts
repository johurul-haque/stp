import 'dotenv/config';
import { z } from 'zod';

export const env = z
  .object({
    PORT: z.number().default(8080),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    IS_DEV: z.boolean().default(process.env.NODE_ENV !== 'production'),
  })
  .parse(process.env);
