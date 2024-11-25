import { z } from 'zod';

const envSchema = z.object({
  // Client-side variables
  VITE_GITHUB_USERNAME: z.string(),
  VITE_GITHUB_USEREMAIL: z.string(),
  VITE_GOOGLE_SEARCH_ENGINE_ID: z.string(),
  
  // Server-side variables
  PERPLEXITY_API_KEY: z.string(),
  XAI_API_KEY: z.string(),
  GROQ_API_KEY: z.string(),
  HUGGINGFACE_TOKEN: z.string(),
  ANTHROPIC_API_KEY: z.string(),
  OPENAI_API_KEY: z.string(),
  GOOGLE_API_KEY: z.string(),
  SERP_API_KEY: z.string(),
  TAVILY_API_KEY: z.string(),
  GITHUB_TOKEN: z.string(),
  LANGCHAIN_SERVICE_API_KEY: z.string(),
  LANGCHAIN_PERSONAL_API_KEY: z.string(),
  PINECONE_API_KEY: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_API: z.string(),
  REDIS_USERNAME: z.string()
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
