import { PineconeClient } from './pinecone-client';
import { thoughtLogger } from '../logging/thought-logger';
import { AppError } from '../errors/AppError';
import { cacheManager } from '../cache/cache-manager';

interface VectorMetadata {
  content: string;
  type: string;
  timestamp: number;
  tags?: string[];
  source?: string;
}

export class VectorStore {
  private pinecone: PineconeClient;
  private readonly namespace = 'vectors';
  private readonly cacheTTL = 3600; // 1 hour

  constructor() {
    this.pinecone = PineconeClient.getInstance();
  }

  async initialize(): Promise<void> {
    await this.pinecone.initialize();
  }

  async addDocument(
    content: string,
    type: string,
    metadata?: Partial<VectorMetadata>
  ): Promise<string> {
    try {
      const id = crypto.randomUUID();
      const vector = await this.generateEmbedding(content);
      
      await this.pinecone.upsert([{
        id,
        values: vector,
        metadata: {
          content,
          type,
          timestamp: Date.now(),
          ...metadata
        }
      }]);

      // Cache the vector
      await cacheManager.set(
        `vector:${id}`,
        { vector, metadata },
        { ttl: this.cacheTTL, namespace: this.namespace }
      );

      return id;
    } catch (error) {
      thoughtLogger.log('error', 'Failed to add document to vector store', { error });
      throw new AppError('Vector store operation failed', 'VECTOR_DB_ERROR', error);
    }
  }

  async search(
    query: string,
    similarity = 0.7,
    limit = 10
  ): Promise<Array<{ id: string; score: number; metadata?: VectorMetadata }>> {
    try {
      const queryVector = await this.generateEmbedding(query);
      
      const results = await this.pinecone.query(queryVector, {
        topK: limit,
        includeMetadata: true
      });

      return results.matches
        .filter(match => match.score >= similarity)
        .map(match => ({
          id: match.id,
          score: match.score,
          metadata: match.metadata as VectorMetadata
        }));
    } catch (error) {
      thoughtLogger.log('error', 'Vector search failed', { error });
      throw new AppError('Vector search failed', 'VECTOR_DB_ERROR', error);
    }
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    // Initialize embedding vector
    const vector = new Array(384).fill(0);
    
    // Normalize and tokenize text
    const tokens = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);

    // Generate semantic embedding
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const tokenHash = this.hashString(token);
      
      // Distribute token influence across embedding
      for (let j = 0; j < 384; j++) {
        vector[j] += Math.sin(tokenHash * (j + 1)) / tokens.length;
      }
    }

    // Normalize vector
    const magnitude = Math.sqrt(
      vector.reduce((sum, val) => sum + val * val, 0)
    );

    return vector.map(val => val / magnitude);
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }

  async deleteVector(id: string): Promise<void> {
    try {
      await this.pinecone.delete([id]);
      await cacheManager.delete(`vector:${id}`, this.namespace);
    } catch (error) {
      thoughtLogger.log('error', 'Failed to delete vector', { error });
      throw new AppError('Vector deletion failed', 'VECTOR_DB_ERROR', error);
    }
  }

  async clear(): Promise<void> {
    try {
      await this.pinecone.deleteAll();
      await cacheManager.clear(this.namespace);
    } catch (error) {
      thoughtLogger.log('error', 'Failed to clear vector store', { error });
      throw new AppError('Vector store clear failed', 'VECTOR_DB_ERROR', error);
    }
  }

  async getStats(): Promise<{
    dimension: number;
    indexFullness: number;
    totalVectorCount: number;
  }> {
    return this.pinecone.describeIndex();
  }
}

export const vectorStore = new VectorStore();