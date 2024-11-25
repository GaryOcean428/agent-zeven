import { z } from 'zod';
import { thoughtLogger } from '../logging/thought-logger';

// API key validation schema
const apiKeysSchema = z.object({
  xai: z.string().min(1, "X.AI API key is required"),
  groq: z.string().min(1, "Groq API key is required"),
  perplexity: z.string().min(1, "Perplexity API key is required"),
  huggingface: z.string().min(1, "Hugging Face token is required"),
  github: z.string().min(1, "GitHub token is required"),
  pinecone: z.string().min(1, "Pinecone API key is required"),
  openai: z.string().min(1, "OpenAI API key is required")
});

export type ApiKeys = z.infer<typeof apiKeysSchema>;

// Get environment variables with proper validation
const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    thoughtLogger.log('warning', `Environment variable ${key} is not set`);
    return '';
  }
  return value.trim();
};

export const config = {
  apiKeys: {
    xai: getEnvVar('VITE_XAI_API_KEY'),
    groq: getEnvVar('VITE_GROQ_API_KEY'),
    perplexity: getEnvVar('VITE_PERPLEXITY_API_KEY'),
    huggingface: getEnvVar('VITE_HUGGINGFACE_TOKEN'),
    github: getEnvVar('VITE_GITHUB_TOKEN'),
    pinecone: getEnvVar('VITE_PINECONE_API_KEY'),
    openai: getEnvVar('VITE_OPENAI_API_KEY')
  },
  services: {
    pinecone: {
      index: getEnvVar('VITE_PINECONE_INDEX') || 'agent-one',
      dimension: 3072,
      metric: 'cosine',
      host: getEnvVar('VITE_PINECONE_HOST'),
      embeddingModel: 'text-embedding-3-large'
    },
    github: {
      baseUrl: 'https://api.github.com',
      apiVersion: '2022-11-28'
    }
  },
  features: {
    enableStreaming: true,
    enableMemory: true,
    enableSearch: true,
    enableGitHub: true
  }
} as const;

export function validateApiKeys() {
  thoughtLogger.log('execution', 'Validating API keys');

  const result = apiKeysSchema.safeParse(config.apiKeys);

  if (!result.success) {
    const missingKeys = result.error.issues
      .filter(issue => issue.code === 'too_small')
      .map(issue => issue.path[0] as string);

    thoughtLogger.log('warning', 'Missing API keys detected', { missingKeys });

    return {
      valid: false,
      missingKeys,
      apiKeys: Object.fromEntries(
        Object.entries(config.apiKeys).map(([key, value]) => [key, Boolean(value)])
      )
    };
  }

  thoughtLogger.log('success', 'All API keys validated successfully');
  return {
    valid: true,
    missingKeys: [],
    apiKeys: Object.fromEntries(
      Object.entries(config.apiKeys).map(([key, value]) => [key, Boolean(value)])
    )
  };
}

export function getApiKeyStatus() {
  return Object.fromEntries(
    Object.entries(config.apiKeys).map(([key, value]) => [key, Boolean(value)])
  );
}