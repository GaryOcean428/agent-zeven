import { z } from 'zod';
import { thoughtLogger } from '../logging/thought-logger';
import type { ThoughtType } from '../types';

// API key validation schema
const apiKeysSchema = z.object({
  xai: z.string().min(1, "X.AI API key is required"),
  groq: z.string().min(1, "Groq API key is required"),
  perplexity: z.string().min(1, "Perplexity API key is required"),
  huggingface: z.string().min(1, "Hugging Face token is required"),
  github: z.string().min(1, "GitHub token is required"),
  pinecone: z.string().min(1, "Pinecone API key is required")
});

export type ApiKeys = z.infer<typeof apiKeysSchema>;

const getEnvVar = (key: string): string => {
  const value = import.meta.env[`VITE_${key}`];
  if (!value) {
    thoughtLogger.log('error' as ThoughtType, `Environment variable VITE_${key} is not set`);
    return '';
  }
  return value.trim();
};

export const config = {
  apiKeys: {
    xai: getEnvVar('XAI_API_KEY'),
    groq: getEnvVar('GROQ_API_KEY'),
    perplexity: getEnvVar('PERPLEXITY_API_KEY'),
    huggingface: getEnvVar('HUGGINGFACE_TOKEN'),
    github: getEnvVar('GITHUB_TOKEN'),
    pinecone: getEnvVar('PINECONE_API_KEY')
  },
  services: {
    pinecone: {
      index: process.env.PINECONE_INDEX || 'agent-one',
      dimension: 3072,
      metric: 'cosine',
      host: process.env.PINECONE_ENV,
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