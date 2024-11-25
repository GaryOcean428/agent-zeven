import { Toolhouse } from '@toolhouseai/sdk';
import { anthropic } from '@vercel/ai';
import { type AIRequestOptions, type AIResponse } from './types';
import { config } from '../config';
import { thoughtLogger } from '../logging/thought-logger';

export class AIClient {
  private toolhouse: Toolhouse;

  constructor() {
    this.toolhouse = new Toolhouse({
      apiKey: config.apiKeys.toolhouse,
      provider: "vercel",
    });
  }

  async generateResponse(options: AIRequestOptions): Promise<AIResponse> {
    try {
      const tools = await this.toolhouse.getTools() as Record<string, any>;
      
      const { text, toolResults } = await generateText({
        model: anthropic(options.model),
        tools,
        messages: options.messages,
        temperature: options.temperature,
        maxTokens: options.maxTokens
      });

      return { text, toolResults };
    } catch (error) {
      thoughtLogger.log('error', 'AI generation failed', { error });
      throw error;
    }
  }

  async streamResponse(options: AIRequestOptions): Promise<ReadableStream> {
    try {
      const tools = await this.toolhouse.getTools() as Record<string, any>;
      
      return streamText({
        model: anthropic(options.model),
        tools,
        messages: options.messages,
        temperature: options.temperature,
        maxTokens: options.maxTokens
      });
    } catch (error) {
      thoughtLogger.log('error', 'AI stream failed', { error });
      throw error;
    }
  }
} 