import { type Message } from '../types';

export interface ModelConfig {
  id: string;
  provider: 'anthropic' | 'openai' | 'vercel';
  maxTokens: number;
  temperature: number;
  capabilities: string[];
}

export interface AIResponse {
  text: string;
  toolResults?: Record<string, any>;
}

export interface AIRequestOptions {
  model: string;
  messages: Message[];
  tools?: Record<string, any>;
  temperature?: number;
  maxTokens?: number;
} 