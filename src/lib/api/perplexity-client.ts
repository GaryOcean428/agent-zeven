import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { validateEnv } from '../config/env';
import { thoughtLogger } from '../logging/thought-logger';

export class PerplexityClient {
  private client: OpenAI;
  private model: string;
  private baseUrl: string;

  constructor() {
    const env = validateEnv();
    
    this.baseUrl = 'https://api.perplexity.ai';
    this.model = 'pplx-7b-online'; // Updated to use their recommended model
    
    this.client = new OpenAI({
      apiKey: env.PERPLEXITY_API_KEY,
      baseURL: this.baseUrl,
    });
  }

  async chat(messages: Array<{ role: string; content: string }>) {
    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'Be precise and concise in your responses.'
          },
          ...messages
        ],
        stream: true,
        max_tokens: 1024,
        temperature: 0.0,
        frequency_penalty: 1
      });

      // Convert the response into a text stream
      const stream = OpenAIStream(response);
      return new StreamingTextResponse(stream);
    } catch (error) {
      thoughtLogger.log('error', 'Perplexity API Error:', { error });
      throw new Error('Failed to get response from Perplexity API');
    }
  }

  async generateCompletion(prompt: string) {
    return this.chat([{ role: 'user', content: prompt }]);
  }
}

// Export singleton instance
export const perplexityClient = new PerplexityClient(); 