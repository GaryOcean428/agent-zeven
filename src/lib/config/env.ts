import { z } from 'zod';

const envSchema = z.object({
  // API Keys
  VITE_GITHUB_USERNAME: z.string(),
  VITE_GITHUB_USEREMAIL: z.string().email(),
  VITE_GOOGLE_SEARCH_ENGINE_ID: z.string(),

  // Server-side variables (these should be in .env.local)
  PERPLEXITY_API_KEY: z.string().optional(),
  XAI_API_KEY: z.string().optional(),
  GROQ_API_KEY: z.string().optional(),
  HUGGINGFACE_TOKEN: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  GOOGLE_API_KEY: z.string().optional(),
  SERP_API_KEY: z.string().optional(),
  TAVILY_API_KEY: z.string().optional(),
  GITHUB_TOKEN: z.string().optional(),
  LANGCHAIN_SERVICE_API_KEY: z.string().optional(),
  LANGCHAIN_PERSONAL_API_KEY: z.string().optional(),
  PINECONE_API_KEY: z.string().optional(),

  // Redis Configuration
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_API: z.string().optional(),
  REDIS_USERNAME: z.string().default('default')
});

// This will throw if required environment variables are missing
const env = envSchema.parse(process.env);

export const config = {
  github: {
    username: env.VITE_GITHUB_USERNAME,
    email: env.VITE_GITHUB_USEREMAIL,
    token: env.GITHUB_TOKEN
  },
  google: {
    searchEngineId: env.VITE_GOOGLE_SEARCH_ENGINE_ID,
    apiKey: env.GOOGLE_API_KEY
  },
  ai: {
    perplexity: env.PERPLEXITY_API_KEY,
    xai: env.XAI_API_KEY,
    groq: env.GROQ_API_KEY,
    huggingface: env.HUGGINGFACE_TOKEN,
    anthropic: env.ANTHROPIC_API_KEY,
    openai: env.OPENAI_API_KEY
  },
  search: {
    serp: env.SERP_API_KEY,
    tavily: env.TAVILY_API_KEY
  },
  langchain: {
    service: env.LANGCHAIN_SERVICE_API_KEY,
    personal: env.LANGCHAIN_PERSONAL_API_KEY
  },
  vectorStore: {
    pinecone: env.PINECONE_API_KEY
  },
  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD,
    api: env.REDIS_API,
    username: env.REDIS_USERNAME
  }
} as const;

// Type for the config object
export type Config = typeof config;

// Export individual config sections
export const {
  github,
  google,
  ai,
  search,
  langchain,
  vectorStore,
  redis
} = config;
