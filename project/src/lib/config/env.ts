import { z } from 'zod';

const envSchema = z.object({
  VITE_XAI_API_KEY: z.string().optional(),
  VITE_GROQ_API_KEY: z.string().optional(),
  VITE_PERPLEXITY_API_KEY: z.string().optional(),
  VITE_HUGGINGFACE_TOKEN: z.string().optional(),
  VITE_GITHUB_TOKEN: z.string().optional(),
  VITE_PINECONE_API_KEY: z.string().optional(),
  VITE_PINECONE_ENVIRONMENT: z.string().optional(),
  VITE_PINECONE_INDEX: z.string().optional()
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): { valid: boolean; missing: string[] } {
  const env = import.meta.env;
  const result = envSchema.safeParse(env);

  if (!result.success) {
    const missing = result.error.issues.map(issue => issue.path.join('.'));
    return { valid: false, missing };
  }

  return { valid: true, missing: [] };
}