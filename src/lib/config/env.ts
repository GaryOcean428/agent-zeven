import { z } from 'zod';

export const envSchema = z.object({
  // Server-side API Keys
  OPENAI_API_KEY: z.string(),
  ANTHROPIC_API_KEY: z.string(),
  PINECONE_API_KEY: z.string().optional(),
  PERPLEXITY_API_KEY: z.string({
    required_error: "PERPLEXITY_API_KEY is required"
  }),
  XAI_API_KEY: z.string().optional(),
  GROQ_API_KEY: z.string().optional(),
  HUGGINGFACE_TOKEN: z.string().optional(),
  GOOGLE_API_KEY: z.string().optional(),
  SERP_API_KEY: z.string().optional(),
  TAVILY_API_KEY: z.string().optional(),
  GITHUB_TOKEN: z.string().optional(),
  LANGCHAIN_SERVICE_API_KEY: z.string().optional(),
  LANGCHAIN_PERSONAL_API_KEY: z.string().optional(),

  // Server-side Configuration
  PINECONE_ENVIRONMENT: z.string().optional().default('development'),
  GOOGLE_SEARCH_ENGINE_ID: z.string().optional(),

  // Client-side Configuration (with VITE_ prefix)
  VITE_API_URL: z.string().default('http://localhost:3000'),
  VITE_VECTOR_STORE_NAMESPACE: z.string().default('development'),
  VITE_VECTOR_DIMENSION: z.string().default('1536'),
  VITE_ENABLE_ANALYTICS: z.string().default('false'),
  VITE_ENABLE_DEBUG: z.string().default('false'),

  // Perplexity Configuration
  PERPLEXITY_BASE_URL: z.string().default('https://api.perplexity.ai'),
  PERPLEXITY_MODEL: z.string().default('pplx-7b-online'),
  PERPLEXITY_MAX_TOKENS: z.number().default(1024),
  PERPLEXITY_TEMPERATURE: z.number().default(0.0),
  PERPLEXITY_FREQUENCY_PENALTY: z.number().default(1),
});

export type Env = z.infer<typeof envSchema>;

// Helper function to validate environment variables
export function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues
        .filter(issue => issue.code === 'invalid_type' && issue.received === 'undefined')
        .map(issue => issue.path.join('.'));
      
      if (missingVars.length > 0) {
        console.error('Missing required environment variables:', missingVars);
      }
    }
    throw error;
  }
}
