import { z } from 'zod';
import { config } from './index';
import { thoughtLogger } from '../logging/thought-logger';

const apiKeysSchema = z.object({
  xai: z.string().min(1, "X.AI API key is required"),
  groq: z.string().min(1, "Groq API key is required"),
  perplexity: z.string().min(1, "Perplexity API key is required"),
  huggingface: z.string().min(1, "Hugging Face token is required"),
  github: z.string().min(1, "GitHub token is required"),
  pinecone: z.string().min(1, "Pinecone API key is required")
});

export type ApiKeys = z.infer<typeof apiKeysSchema>;

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