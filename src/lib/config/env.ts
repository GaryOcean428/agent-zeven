import { z } from 'zod';

export const envSchema = z.object({
  // Client-side variables (optional with defaults)
  VITE_GITHUB_USERNAME: z.string().optional().default(''),
  VITE_GITHUB_USEREMAIL: z.string().optional().default(''),
  VITE_GOOGLE_SEARCH_ENGINE_ID: z.string().optional().default(''),
  
  // API Keys (required for core functionality)
  VITE_OPENAI_API_KEY: z.string(),
  VITE_ANTHROPIC_API_KEY: z.string(),
  
  // Optional API Keys (with fallbacks)
  PERPLEXITY_API_KEY: z.string().optional(),
  XAI_API_KEY: z.string().optional(),
  GROQ_API_KEY: z.string().optional(),
  HUGGINGFACE_TOKEN: z.string().optional(),
  GOOGLE_API_KEY: z.string().optional(),
  SERP_API_KEY: z.string().optional(),
  TAVILY_API_KEY: z.string().optional(),
  GITHUB_TOKEN: z.string().optional(),
  
  // LangChain configuration (optional)
  LANGCHAIN_SERVICE_API_KEY: z.string().optional(),
  LANGCHAIN_PERSONAL_API_KEY: z.string().optional(),
  
  // Vector store configuration (optional with defaults)
  PINECONE_API_KEY: z.string().optional(),
  VITE_VECTOR_STORE_NAMESPACE: z.string().optional().default('development'),
  VITE_VECTOR_DIMENSION: z.string().optional().default('1536'),
  
  // Redis configuration (optional)
  REDIS_HOST: z.string().optional().default('localhost'),
  REDIS_PORT: z.string().optional().default('6379'),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_API: z.string().optional(),
  REDIS_USERNAME: z.string().optional().default('default'),
  
  // Feature flags (optional with defaults)
  VITE_ENABLE_ANALYTICS: z.string().optional().default('false'),
  VITE_ENABLE_DEBUG: z.string().optional().default('false')
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
