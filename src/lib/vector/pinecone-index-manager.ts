import { PineconeClient } from '@pinecone-database/pinecone';
import { thoughtLogger } from '../logging/thought-logger';

export interface IndexConfig {
  name: string;
  dimension: number;
  metric?: 'cosine' | 'euclidean' | 'dotProduct';
  pods?: number;
  replicas?: number;
  podType?: string;
  metadata?: Record<string, unknown>;
}

export interface IndexStats {
  vectorCount: number;
  dimensionCount: number;
  namespaceCount: number;
  indexSize: number;
  indexFullness: number;
}

export interface IndexMetrics {
  totalRequests: number;
  averageLatency: number;
  errorRate: number;
  throughput: number;
}

export class PineconeIndexManager {
  private client: PineconeClient;
  private isInitialized: boolean = false;

  constructor() {
    this.client = new PineconeClient();
  }

  async initialize(apiKey: string, environment: string): Promise<void> {
    try {
      await this.client.init({
        apiKey,
        environment
      });
      this.isInitialized = true;
      thoughtLogger.log('execution', 'Pinecone index manager initialized');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to initialize Pinecone index manager', { error });
      throw error;
    }
  }

  async createIndex(config: IndexConfig): Promise<void> {
    this.validateInitialization();
    try {
      await this.client.createIndex({
        name: config.name,
        dimension: config.dimension,
        metric: config.metric || 'cosine',
        pods: config.pods || 1,
        replicas: config.replicas || 1,
        podType: config.podType || 'p1.x1',
        metadata: config.metadata
      });

      thoughtLogger.log('execution', 'Created Pinecone index', { name: config.name });
    } catch (error) {
      thoughtLogger.log('error', 'Failed to create Pinecone index', { error, config });
      throw error;
    }
  }

  async deleteIndex(indexName: string): Promise<void> {
    this.validateInitialization();
    try {
      await this.client.deleteIndex(indexName);
      thoughtLogger.log('execution', 'Deleted Pinecone index', { name: indexName });
    } catch (error) {
      thoughtLogger.log('error', 'Failed to delete Pinecone index', { error, indexName });
      throw error;
    }
  }

  async listIndexes(): Promise<string[]> {
    this.validateInitialization();
    try {
      return await this.client.listIndexes();
    } catch (error) {
      thoughtLogger.log('error', 'Failed to list Pinecone indexes', { error });
      throw error;
    }
  }

  async describeIndex(indexName: string): Promise<IndexConfig & IndexStats> {
    this.validateInitialization();
    try {
      const description = await this.client.describeIndex(indexName);
      return {
        name: indexName,
        dimension: description.dimension,
        metric: description.metric,
        pods: description.pods,
        replicas: description.replicas,
        podType: description.podType,
        vectorCount: description.vectorCount,
        dimensionCount: description.dimension,
        namespaceCount: description.namespaces?.length || 0,
        indexSize: description.indexSize || 0,
        indexFullness: description.indexFullness || 0
      };
    } catch (error) {
      thoughtLogger.log('error', 'Failed to describe Pinecone index', { error, indexName });
      throw error;
    }
  }

  async configureIndex(indexName: string, updates: Partial<IndexConfig>): Promise<void> {
    this.validateInitialization();
    try {
      await this.client.configureIndex(indexName, {
        replicas: updates.replicas,
        podType: updates.podType
      });
      thoughtLogger.log('execution', 'Updated Pinecone index configuration', { indexName, updates });
    } catch (error) {
      thoughtLogger.log('error', 'Failed to configure Pinecone index', { error, indexName, updates });
      throw error;
    }
  }

  async getIndexStats(indexName: string): Promise<IndexStats> {
    this.validateInitialization();
    try {
      const stats = await this.client.describeIndexStats(indexName);
      return {
        vectorCount: stats.totalVectorCount,
        dimensionCount: stats.dimension,
        namespaceCount: Object.keys(stats.namespaces || {}).length,
        indexSize: stats.indexSize || 0,
        indexFullness: stats.indexFullness || 0
      };
    } catch (error) {
      thoughtLogger.log('error', 'Failed to get Pinecone index stats', { error, indexName });
      throw error;
    }
  }

  async getIndexMetrics(indexName: string): Promise<IndexMetrics> {
    this.validateInitialization();
    try {
      // Note: This is a placeholder. Actual metrics would come from Pinecone's metrics API
      const metrics = await this.client.describeIndex(indexName);
      return {
        totalRequests: 0,
        averageLatency: 0,
        errorRate: 0,
        throughput: 0
      };
    } catch (error) {
      thoughtLogger.log('error', 'Failed to get Pinecone index metrics', { error, indexName });
      throw error;
    }
  }

  private validateInitialization(): void {
    if (!this.isInitialized) {
      throw new Error('Pinecone index manager not initialized');
    }
  }
} 