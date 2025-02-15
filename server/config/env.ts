import { z } from 'zod';

const envSchema = z.object({
  MONGO_URI: z.string(),
  LINE_TOKEN: z.string(),
  LINE_GROUPID: z.string(),
  ANNOUNCEMENT_ID: z.string(),
  FEATURABLE_ACCOUNT_ID: z.string(),
  FEATURABLE_LOCATION_ID: z.string(),
  FEATURABLE_API_KEY: z.string(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
});

export const env = envSchema.parse(process.env);
export type EnvType = z.infer<typeof envSchema>;
