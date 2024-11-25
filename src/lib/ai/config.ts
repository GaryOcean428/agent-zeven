import { type ModelConfig } from './types';

export const AI_MODELS: Record<string, ModelConfig> = {
  'claude-3-sonnet': {
    id: 'claude-3-sonnet',
    provider: 'anthropic',
    maxTokens: 4096,
    temperature: 0.7,
    capabilities: ['code', 'analysis', 'reasoning']
  },
  'gpt-4-turbo': {
    id: 'gpt-4-turbo',
    provider: 'openai',
    maxTokens: 4096,
    temperature: 0.7,
    capabilities: ['code', 'analysis', 'reasoning']
  }
}; 