import dotenv from 'dotenv';
import * as path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const env = z
  .object({
    PORT: z.number().default(8080),
    DATABASE_URL: z.string(),
    IS_DEV: z.any().transform((val) => val === 'development'),
  })
  .parse(process.env);
