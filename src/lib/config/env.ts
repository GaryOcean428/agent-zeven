import { z } from 'zod';

const envSchema = z.object({
  // Required APIs
  VITE_XAI_API_KEY: z.string(),
  VITE_GROQ_API_KEY: z.string(),
  VITE_PERPLEXITY_API_KEY: z.string(),
  VITE_HUGGINGFACE_TOKEN: z.string(),
  VITE_GITHUB_TOKEN: z.string(),
  
  // Optional APIs
  VITE_PINECONE_API_KEY: z.string().optional(),
  VITE_PINECONE_ENVIRONMENT: z.string().optional(),
  VITE_PINECONE_INDEX: z.string().optional(),
  VITE_TAVILY_API_KEY: z.string().optional(),
  VITE_GOOGLE_API_KEY: z.string().optional(),
  VITE_GOOGLE_SEARCH_ENGINE_ID: z.string().optional(),
  VITE_SERP_API_KEY: z.string().optional()
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): { valid: boolean; missing: string[] } {
  const env = import.meta.env;
  const result = envSchema.safeParse(env);

  if (!result.success) {
    // Only report required env variables as missing
    const missing = result.error.issues
      .filter(issue => !issue.path[0].toString().includes('OPTIONAL'))
      .map(issue => issue.path.join('.'));
    return { valid: false, missing };
  }

  return { valid: true, missing: [] };
} 