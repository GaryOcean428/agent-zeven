import { Toolhouse } from '@toolhouseai/sdk';
import { thoughtLogger } from '../logging/thought-logger';
import { config } from '../config';

// Define interfaces in types.ts and import them
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

export class AIClient {
  constructor() {
    thoughtLogger.log('execution', 'Initializing AI Client');
  }

  async generateResponse(options: AIRequestOptions): Promise<AIResponse> {
    thoughtLogger.log('execution', 'Generating AI response', { options });
    
    return {
      text: "Development mode response",
      toolResults: {}
    };
  }

  async streamResponse(options: AIRequestOptions): Promise<ReadableStream> {
    thoughtLogger.log('execution', 'Streaming AI response', { options });
    throw new Error('Streaming not implemented in development mode');
  }
} 