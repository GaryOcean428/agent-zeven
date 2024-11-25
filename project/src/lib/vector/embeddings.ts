import { thoughtLogger } from '../logging/thought-logger';
import { AppError } from '../errors/AppError';
import { config } from '../config';

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKeys.openai}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: text,
        model: 'text-embedding-3-large',
        encoding_format: 'float'
      })
    });

    if (!response.ok) {
      throw new AppError(
        `OpenAI API error: ${response.statusText}`,
        'API_ERROR',
        { status: response.status }
      );
    }

    const data = await response.json();
    return data.data[0].embedding;
  } catch (error) {
    thoughtLogger.log('error', 'Failed to generate embedding', { error });
    throw error instanceof AppError ? error : new AppError(
      'Failed to generate embedding',
      'API_ERROR',
      error
    );
  }
}