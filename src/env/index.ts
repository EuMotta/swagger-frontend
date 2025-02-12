import zod from 'zod';

const envSchema = zod.object({
  PUBLIC_URL: zod.string().min(1),
  NEXTAUTH_SECRET: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
