import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().optional(),
  VITE_PUBLIC_APP_MODE: z.string().optional(),
  XAI_TOKEN: z.string().optional(),
  GROQ_TOKEN: z.string().optional(),
  PERPLEXITY_TOKEN: z.string().optional(),
  HUGGINGFACE_TOKEN: z.string().optional(),
  GITHUB_TOKEN: z.string().optional(),
  PINECONE_TOKEN: z.string().optional(),
  PINECONE_ENV: z.string().optional(),
  PINECONE_INDEX: z.string().optional()
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): { valid: boolean; missing: string[] } {
  const publicEnv = import.meta.env;
  const privateEnv = process.env;

  const combinedEnv = {
    ...publicEnv,
    ...privateEnv
  };

  const result = envSchema.safeParse(combinedEnv);

  if (!result.success) {
    const missing = result.error.issues.map(issue => issue.path.join('.'));
    return { valid: false, missing };
  }

  return { valid: true, missing: [] };
}