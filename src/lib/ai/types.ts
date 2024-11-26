import { type Message } from '../types';

export interface AIRequestOptions {
  model: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  text: string;
  toolResults: Record<string, unknown>;
}

export interface AIModelConfig {
  id: string;
  provider: 'openai' | 'anthropic' | 'groq' | 'perplexity';
  maxTokens: number;
  temperature: number;
} 