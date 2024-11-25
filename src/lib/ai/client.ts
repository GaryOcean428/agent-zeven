import { Toolhouse } from '@toolhouseai/sdk';
import { anthropic } from '@vercel/ai';
import { type AIRequestOptions, type AIResponse } from './types';
import { config } from '../config';
import { thoughtLogger } from '../logging/thought-logger';
import type { AIRequestOptions, AIResponse } from './types';

export class AIClient {
  private toolhouse: Toolhouse;

  constructor() {
    this.toolhouse = new Toolhouse({
      apiKey: config.apiKeys.toolhouse,
      provider: "vercel",
    });
  }

  async generateResponse(options: AIRequestOptions): Promise<AIResponse> {
    return {
      text: "Development mode response",
      toolResults: {}
    };
  }

  async streamResponse(options: AIRequestOptions): Promise<ReadableStream> {
    // Implementation for streaming response
    throw new Error('Streaming not implemented in development mode');
  }
} 