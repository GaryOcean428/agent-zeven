import { PineconeClient, type Vector } from '@pinecone-database/pinecone';
import { thoughtLogger } from '../logging/thought-logger';
import { BaseVectorStore } from './base-vector-store';

interface PineconeConfig {
  apiKey: string;
  environment: string;
  namespace?: string;
  batchSize?: number;
  dimension?: number;
}

interface VectorFilter {
  [key: string]: any;
}

interface VectorMetrics {
  operations: {
    upserts: number;
    queries: number;
    fetches: number;
    deletions: number;
  };
  performance: {
    averageUpsertTime: number;
    averageQueryTime: number;
    averageFetchTime: number;
    averageDeletionTime: number;
  };
}

export class PineconeStoreClient extends BaseVectorStore {
  private client: PineconeClient;
  private config: PineconeConfig;
  private metrics: VectorMetrics;

  constructor(config: PineconeConfig) {
    super();
    this.config = {
      ...config,
      batchSize: config.batchSize || 100,
      dimension: config.dimension && (config.dimension >= 1 && config.dimension <= 20000) ? config.dimension : 1536,
    };
    this.client = new PineconeClient();
    this.metrics = {
      operations: {
        upserts: 0,
        queries: 0,
        fetches: 0,
        deletions: 0
      },
      performance: {
        averageUpsertTime: 0,
        averageQueryTime: 0,
        averageFetchTime: 0,
        averageDeletionTime: 0
      }
    };
  }

  async initialize(): Promise<void> {
    try {
      await this.client.init({
        apiKey: this.config.apiKey,
        environment: this.config.environment
      });
      thoughtLogger.log('success', 'Pinecone client initialized successfully');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to initialize Pinecone client', { error });
      throw error;
    }
  }

  async upsert(vectors: Vector[]): Promise<void> {
    try {
      const startTime = Date.now();
      const index = this.client.Index(this.config.namespace || 'default');

      for (let i = 0; i < vectors.length; i += this.config.batchSize!) {
        const batch = vectors.slice(i, i + this.config.batchSize!);
        await index.upsert({
          vectors: batch,
          namespace: this.config.namespace
        });
      }

      this.metrics.operations.upserts++;
      this.updatePerformanceMetrics('upsert', startTime);
      thoughtLogger.log('success', 'Vectors upserted successfully', { count: vectors.length });
    } catch (error) {
      thoughtLogger.log('error', 'Failed to upsert vectors', { error });
      throw error;
    }
  }

  async query(vector: number[], filter?: VectorFilter, topK: number = 10): Promise<Vector[]> {
    try {
      const startTime = Date.now();
      const index = this.client.Index(this.config.namespace || 'default');

      const response = await index.query({
        vector,
        topK,
        filter: this.transformFilter(filter),
        namespace: this.config.namespace,
        includeMetadata: true
      });

      this.metrics.operations.queries++;
      this.updatePerformanceMetrics('query', startTime);
      return response.matches as Vector[];
    } catch (error) {
      thoughtLogger.log('error', 'Failed to query vectors', { error });
      throw error;
    }
  }

  async fetch(ids: string[]): Promise<Vector[]> {
    try {
      const startTime = Date.now();
      const index = this.client.Index(this.config.namespace || 'default');
      const vectors: Vector[] = [];

      for (let i = 0; i < ids.length; i += this.config.batchSize!) {
        const batchIds = ids.slice(i, i + this.config.batchSize!);
        const response = await index.fetch({
          ids: batchIds,
          namespace: this.config.namespace
        });
        vectors.push(...Object.values(response.vectors));
      }

      this.metrics.operations.fetches++;
      this.updatePerformanceMetrics('fetch', startTime);
      return vectors;
    } catch (error) {
      thoughtLogger.log('error', 'Failed to fetch vectors', { error });
      throw error;
    }
  }

  private transformFilter(filter?: VectorFilter): Record<string, any> | undefined {
    if (!filter) return undefined;

    // Transform the filter object into Pinecone's expected format
    const transformedFilter: Record<string, any> = {};
    for (const [key, value] of Object.entries(filter)) {
      if (Array.isArray(value)) {
        transformedFilter[key] = { $in: value };
      } else if (typeof value === 'object') {
        transformedFilter[key] = value;
      } else {
        transformedFilter[key] = { $eq: value };
      }
    }

    return transformedFilter;
  }

  private updatePerformanceMetrics(operation: 'upsert' | 'query' | 'fetch' | 'deletion', startTime: number): void {
    const duration = Date.now() - startTime;
    const metricsKey = `average${operation.charAt(0).toUpperCase() + operation.slice(1)}Time`;
    const currentAverage = this.metrics.performance[metricsKey as keyof VectorMetrics['performance']];
    const operationCount = this.metrics.operations[`${operation}s` as keyof VectorMetrics['operations']];
    
    this.metrics.performance[metricsKey as keyof VectorMetrics['performance']] = 
      (currentAverage * (operationCount - 1) + duration) / operationCount;
  }

  async close(): Promise<void> {
    try {
      thoughtLogger.log('execution', 'Closing Pinecone client connection');
      await super.close();
      thoughtLogger.log('success', 'Pinecone client connection closed');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to close Pinecone client connection', { error });
      throw error;
    }
  }
} 