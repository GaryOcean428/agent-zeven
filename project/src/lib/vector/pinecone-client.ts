import { Pinecone } from '@pinecone-database/pinecone';
import { thoughtLogger } from '../logging/thought-logger';
import { AppError } from '../errors/AppError';
import { config } from '../config';
import { RateLimiter } from '../api/rate-limiter';

interface VectorData {
  id: string;
  values: number[];
  metadata?: Record<string, any>;
}

interface QueryResponse {
  matches: Array<{
    id: string;
    score: number;
    metadata?: Record<string, any>;
  }>;
}

export class PineconeClient {
  private static instance: PineconeClient;
  private client: Pinecone | null = null;
  private index: any;
  private initialized = false;
  private rateLimiter: RateLimiter;

  private constructor() {
    this.rateLimiter = new RateLimiter({
      maxRequests: 100,
      interval: 60 * 1000 // 1 minute
    });

    if (!config.apiKeys.pinecone) {
      thoughtLogger.log('warning', 'Pinecone API key not configured');
    }
  }

  static getInstance(): PineconeClient {
    if (!PineconeClient.instance) {
      PineconeClient.instance = new PineconeClient();
    }
    return PineconeClient.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      if (!config.apiKeys.pinecone) {
        throw new AppError('Pinecone API key not configured', 'CONFIG_ERROR');
      }

      this.client = new Pinecone({
        apiKey: config.apiKeys.pinecone,
        environment: config.services.pinecone.host
      });

      this.index = this.client.index(config.services.pinecone.index);

      // Verify connection
      await this.index.describeIndexStats();

      this.initialized = true;
      thoughtLogger.log('success', 'Pinecone client initialized successfully');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to initialize Pinecone client', { error });
      throw new AppError('Pinecone initialization failed', 'PINECONE_ERROR', error);
    }
  }

  async upsert(vectors: VectorData[]): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    await this.rateLimiter.acquire();

    try {
      await this.index.upsert(vectors);
      thoughtLogger.log('success', 'Vectors upserted successfully', {
        count: vectors.length
      });
    } catch (error) {
      thoughtLogger.log('error', 'Vector upsert failed', { error });
      throw new AppError('Vector upsert failed', 'PINECONE_ERROR', error);
    }
  }

  async query(
    vector: number[],
    options: {
      topK?: number;
      filter?: Record<string, any>;
      includeMetadata?: boolean;
    } = {}
  ): Promise<QueryResponse> {
    if (!this.initialized) {
      await this.initialize();
    }

    await this.rateLimiter.acquire();

    try {
      const response = await this.index.query({
        vector,
        topK: options.topK || 10,
        filter: options.filter,
        includeMetadata: options.includeMetadata
      });

      return response;
    } catch (error) {
      thoughtLogger.log('error', 'Vector query failed', { error });
      throw new AppError('Vector query failed', 'PINECONE_ERROR', error);
    }
  }

  async delete(ids: string[]): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    await this.rateLimiter.acquire();

    try {
      await this.index.deleteMany(ids);
      thoughtLogger.log('success', 'Vectors deleted successfully', {
        count: ids.length
      });
    } catch (error) {
      thoughtLogger.log('error', 'Vector deletion failed', { error });
      throw new AppError('Vector deletion failed', 'PINECONE_ERROR', error);
    }
  }

  async deleteAll(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    await this.rateLimiter.acquire();

    try {
      await this.index.deleteAll();
      thoughtLogger.log('success', 'All vectors deleted successfully');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to delete all vectors', { error });
      throw new AppError('Failed to delete all vectors', 'PINECONE_ERROR', error);
    }
  }

  async describeIndex(): Promise<{
    dimension: number;
    indexFullness: number;
    totalVectorCount: number;
  }> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const stats = await this.index.describeIndexStats();
      return {
        dimension: config.services.pinecone.dimension,
        indexFullness: stats.indexFullness || 0,
        totalVectorCount: stats.totalVectorCount || 0
      };
    } catch (error) {
      thoughtLogger.log('error', 'Failed to get index stats', { error });
      throw new AppError('Failed to get index stats', 'PINECONE_ERROR', error);
    }
  }

  get isInitialized(): boolean {
    return this.initialized;
  }
}

export const pineconeClient = PineconeClient.getInstance();