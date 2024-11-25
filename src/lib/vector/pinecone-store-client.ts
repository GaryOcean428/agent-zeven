import { PineconeClient, QueryRequest, UpsertRequest } from '@pinecone-database/pinecone';
import { thoughtLogger } from '../logging/thought-logger';
import { config } from '../config';
import { 
  Vector,
  VectorStoreConfig,
  VectorQuery,
  VectorQueryResponse,
  VectorStoreError,
  VectorStoreClient,
  VectorStoreEvent,
  VectorFilter
} from './types';
import { VectorStoreClientImpl } from './vector-store-client';

export class PineconeStoreClient extends VectorStoreClientImpl {
  private pinecone: PineconeClient;
  private indexName: string;
  private namespace: string;

  constructor() {
    super();
    this.pinecone = new PineconeClient();
  }

  async initialize(config: VectorStoreConfig): Promise<void> {
    try {
      await super.initialize(config);

      if (!config.apiKeys?.pinecone) {
        throw new Error('Pinecone API key not configured');
      }

      await this.pinecone.init({
        apiKey: config.apiKeys.pinecone,
        environment: config.services?.pinecone?.environment || 'production'
      });

      this.indexName = config.services?.pinecone?.indexName || 'default-index';
      this.namespace = config.namespace || 'default';

      // Verify index exists
      const indexList = await this.pinecone.listIndexes();
      if (!indexList.includes(this.indexName)) {
        throw new Error(`Pinecone index ${this.indexName} not found`);
      }

      thoughtLogger.log('execution', 'Pinecone store initialized', {
        indexName: this.indexName,
        namespace: this.namespace
      });
    } catch (error) {
      this.handleError('INITIALIZATION_ERROR', 'Failed to initialize Pinecone store', error);
      throw error;
    }
  }

  async upsert(vectors: Vector[]): Promise<string[]> {
    this.validateInitialization();
    const startTime = Date.now();

    try {
      const index = this.pinecone.Index(this.indexName);
      const vectorIds: string[] = [];

      // Process in batches
      for (let i = 0; i < vectors.length; i += this.config.batchSize!) {
        const batch = vectors.slice(i, i + this.config.batchSize!);
        
        const upsertRequest: UpsertRequest = {
          vectors: batch.map(vector => ({
            id: vector.id,
            values: vector.values,
            metadata: vector.metadata
          })),
          namespace: this.namespace
        };

        await index.upsert({ upsertRequest });
        vectorIds.push(...batch.map(v => v.id));
      }

      this.updateMetrics('upsert', startTime, vectors.length);
      return vectorIds;
    } catch (error) {
      this.handleError('OPERATION_ERROR', 'Pinecone upsert operation failed', error);
      throw error;
    }
  }

  async query(query: VectorQuery): Promise<VectorQueryResponse> {
    this.validateInitialization();
    const startTime = Date.now();

    try {
      const index = this.pinecone.Index(this.indexName);

      const queryRequest: QueryRequest = {
        vector: query.vector,
        topK: query.topK || 10,
        namespace: query.namespace || this.namespace,
        includeMetadata: query.includeMetadata ?? true,
        filter: this.transformFilter(query.filter)
      };

      const queryResponse = await index.query({ queryRequest });

      const response: VectorQueryResponse = {
        matches: queryResponse.matches?.map(match => ({
          id: match.id,
          score: match.score,
          values: match.values,
          metadata: match.metadata
        })) || [],
        namespace: query.namespace || this.namespace
      };

      this.updateMetrics('query', startTime);
      return response;
    } catch (error) {
      this.handleError('QUERY_ERROR', 'Pinecone query operation failed', error);
      throw error;
    }
  }

  async delete(ids: string[]): Promise<void> {
    this.validateInitialization();
    try {
      const index = this.pinecone.Index(this.indexName);
      
      // Process deletions in batches
      for (let i = 0; i < ids.length; i += this.config.batchSize!) {
        const batch = ids.slice(i, i + this.config.batchSize!);
        await index.delete1({
          ids: batch,
          namespace: this.namespace
        });
      }

      this.metrics.operations.deletes += ids.length;
      thoughtLogger.log('execution', 'Vectors deleted from Pinecone', { count: ids.length });
    } catch (error) {
      this.handleError('OPERATION_ERROR', 'Pinecone delete operation failed', error);
      throw error;
    }
  }

async fetch(ids: string[]): Promise {
  this.validateInitialization();
  let retries = 0;
  while (retries < this.config.maxRetries!) {
    try {
      const index = this.pinecone.Index(this.indexName);
      const vectors: Vector[] = [];
      return vectors;
    } catch (error) {
      if (retries === this.config.maxRetries! - 1) throw error;
      retries++;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
    }
  }
  throw new Error('Max retries exceeded');
}

      // Process fetches in batches
      for (let i = 0; i < ids.length; i += this.config.batchSize!) {
        const batch = ids.slice(i, i + this.config.batchSize!);
        const response = await index.fetch({
          ids: batch,
          namespace: this.namespace
        });

        if (response.vectors) {
          for (const [id, vector] of Object.entries(response.vectors)) {
            vectors.push({
              id,
              values: vector.values,
              metadata: vector.metadata
            });
          }
        }
      }

      this.metrics.operations.fetches++;
      return vectors;
    } catch (error) {
      this.handleError('OPERATION_ERROR', 'Pinecone fetch operation failed', error);
      throw error;
    }
  }

  private transformFilter(filter?: VectorFilter): Record<string, any> | undefined {
    if (!filter) return undefined;

    const pineconeFilter: Record<string, any> = {};

    if (filter.source) {
      pineconeFilter['source'] = { $eq: filter.source };
    }

    if (filter.type) {
      pineconeFilter['type'] = { $eq: filter.type };
    }

    if (filter.timestamp) {
      pineconeFilter['timestamp'] = {};
      if (filter.timestamp.gt) {
        pineconeFilter['timestamp']['$gt'] = filter.timestamp.gt;
      }
      if (filter.timestamp.lt) {
        pineconeFilter['timestamp']['$lt'] = filter.timestamp.lt;
      }
    }

if (filter.metadata) {
  Object.entries(filter.metadata).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      pineconeFilter[key] = value; // Preserve nested operators
    } else {
      pineconeFilter[key] = { $eq: value };
    }
  });
}

    return pineconeFilter;
  }

  async close(): Promise<void> {
    try {
      // Clean up Pinecone client resources if needed
      await super.close();
    } catch (error) {
      this.handleError('CONNECTION_ERROR', 'Failed to close Pinecone store', error);
      throw error;
    }
  }
} 