import { thoughtLogger } from '../logging/thought-logger';
import { AppError } from '../errors/AppError';
import { config } from '../config';
import type { Message } from '../types';

export class QwenAPI {
  private static instance: QwenAPI;
  private initialized = false;
  private readonly model = 'Qwen/Qwen2.5-Coder-32B-Instruct';

  private constructor() {}

  static getInstance(): QwenAPI {
    if (!QwenAPI.instance) {
      QwenAPI.instance = new QwenAPI();
    }
    return QwenAPI.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      if (!config.apiKeys.huggingface) {
        throw new AppError('Hugging Face API key not configured', 'CONFIG_ERROR');
      }

      this.initialized = true;
      thoughtLogger.log('success', 'Qwen API initialized successfully');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to initialize Qwen API', { error });
      throw error;
    }
  }

  async generateCode(
    prompt: string,
    language?: string,
    onProgress?: (content: string) => void
  ): Promise<string> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      thoughtLogger.log('execution', 'Generating code with Qwen', {
        language,
        promptLength: prompt.length
      });

      const response = await fetch(`https://api-inference.huggingface.co/models/${this.model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKeys.huggingface}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: this.formatPrompt(prompt, language),
          parameters: {
            max_new_tokens: 2048,
            temperature: 0.2,
            top_p: 0.95,
            stream: Boolean(onProgress)
          }
        })
      });

      if (!response.ok) {
        throw new AppError(
          `Qwen API error: ${response.statusText}`,
          'API_ERROR',
          { status: response.status }
        );
      }

      if (onProgress && response.body) {
        return this.handleStreamingResponse(response.body, onProgress);
      }

      const data = await response.json();
      thoughtLogger.log('success', 'Code generation complete');
      return data[0].generated_text;
    } catch (error) {
      thoughtLogger.log('error', 'Code generation failed', { error });
      throw error instanceof AppError ? error : new AppError(
        'Failed to generate code',
        'GENERATION_ERROR',
        error
      );
    }
  }

  async reviewCode(
    code: string,
    language?: string
  ): Promise<{ issues: string[]; suggestions: string[]; quality: number }> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      thoughtLogger.log('execution', 'Reviewing code with Qwen', { language });

      const prompt = `Review the following ${language || ''} code and provide:
1. List of potential issues
2. Improvement suggestions
3. Code quality score (0-100)

Code to review:
\`\`\`
${code}
\`\`\``;

      const response = await fetch(`https://api-inference.huggingface.co/models/${this.model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKeys.huggingface}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 1024,
            temperature: 0.3
          }
        })
      });

      if (!response.ok) {
        throw new AppError(
          `Qwen API error: ${response.statusText}`,
          'API_ERROR',
          { status: response.status }
        );
      }

      const data = await response.json();
      const result = this.parseReviewResponse(data[0].generated_text);

      thoughtLogger.log('success', 'Code review complete', {
        issueCount: result.issues.length,
        suggestionCount: result.suggestions.length,
        quality: result.quality
      });

      return result;
    } catch (error) {
      thoughtLogger.log('error', 'Code review failed', { error });
      throw error instanceof AppError ? error : new AppError(
        'Failed to review code',
        'REVIEW_ERROR',
        error
      );
    }
  }

  private formatPrompt(prompt: string, language?: string): string {
    return `You are an expert programmer. Generate high-quality ${language || ''} code based on the following request:

${prompt}

Provide clean, efficient, and well-documented code with proper error handling.`;
  }

  private async handleStreamingResponse(
    body: ReadableStream<Uint8Array>,
    onProgress: (content: string) => void
  ): Promise<string> {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let fullContent = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;
        onProgress(chunk);
      }

      return fullContent;
    } finally {
      reader.releaseLock();
    }
  }

  private parseReviewResponse(response: string): {
    issues: string[];
    suggestions: string[];
    quality: number;
  } {
    const issues: string[] = [];
    const suggestions: string[] = [];
    let quality = 0;

    const lines = response.split('\n');
    let currentSection = '';

    for (const line of lines) {
      if (line.includes('Issues:')) {
        currentSection = 'issues';
      } else if (line.includes('Suggestions:')) {
        currentSection = 'suggestions';
      } else if (line.includes('Quality Score:')) {
        quality = parseInt(line.match(/\d+/)?.[0] || '0');
      } else if (line.trim().startsWith('-')) {
        const item = line.trim().slice(2);
        if (currentSection === 'issues') {
          issues.push(item);
        } else if (currentSection === 'suggestions') {
          suggestions.push(item);
        }
      }
    }

    return { issues, suggestions, quality };
  }

  get isInitialized(): boolean {
    return this.initialized;
  }
}