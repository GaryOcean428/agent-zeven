import { describe, it, expect, afterAll } from '@jest/globals';
import { PineconeIndexManager, IndexConfig } from '../pinecone-index-manager';
import { PineconeStoreClient } from '../pinecone-store-client';
import { Vector, VectorStoreConfig } from '../types';

// These tests require actual Pinecone credentials
// They should only run in a CI environment or locally with proper credentials
describe('Pinecone Integration Tests', () => {
  let indexManager: PineconeIndexManager;
  let vectorStore: PineconeStoreClient;
  
  const testIndexConfig: IndexConfig = {
    name: `test-index-${Date.now()}`,
    dimension: 384,
    metric: 'cosine',
    pods: 1,
    replicas: 1,
    podType: 'p1.x1'
  };

  const vectorStoreConfig: VectorStoreConfig = {
    dimension: 384,
    metric: 'cosine',
    namespace: 'test-namespace',
    batchSize: 100,
    maxRetries: 3,
    apiKeys: {
      pinecone: process.env.PINECONE_API_KEY
    },
    services: {
      pinecone: {
        environment: process.env.PINECONE_ENVIRONMENT,
        indexName: testIndexConfig.name
      }
    }
  };

  beforeAll(async () => {
    // Skip if no credentials
    if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_ENVIRONMENT) {
      console.log('Skipping Pinecone integration tests - no credentials');
      return;
    }

    indexManager = new PineconeIndexManager();
    await indexManager.initialize(
      process.env.PINECONE_API_KEY,
      process.env.PINECONE_ENVIRONMENT
    );

    // Create test index
    await indexManager.createIndex(testIndexConfig);
    
    // Initialize vector store
    vectorStore = new PineconeStoreClient();
    await vectorStore.initialize(vectorStoreConfig);
  });

  afterAll(async () => {
    if (!process.env.PINECONE_API_KEY) return;
    
    // Cleanup
    await indexManager.deleteIndex(testIndexConfig.name);
  });

  describe('Index Management', () => {
    it('should list indexes including test index', async () => {
      const indexes = await indexManager.listIndexes();
      expect(indexes).toContain(testIndexConfig.name);
    });

    it('should describe index correctly', async () => {
      const description = await indexManager.describeIndex(testIndexConfig.name);
      expect(description.dimension).toBe(testIndexConfig.dimension);
      expect(description.metric).toBe(testIndexConfig.metric);
    });

    it('should get index statistics', async () => {
      const stats = await indexManager.getIndexStats(testIndexConfig.name);
      expect(stats.vectorCount).toBeDefined();
      expect(stats.dimensionCount).toBe(testIndexConfig.dimension);
    });
  });

  describe('Vector Operations', () => {
    const testVectors: Vector[] = [
      {
        id: 'test-1',
        values: Array(384).fill(0.1),
        metadata: { source: 'test' }
      },
      {
        id: 'test-2',
        values: Array(384).fill(0.2),
        metadata: { source: 'test' }
      }
    ];

    it('should upsert and query vectors', async () => {
      // Upsert test vectors
      await vectorStore.upsert(testVectors);

      // Query similar vectors
      const results = await vectorStore.query({
        vector: testVectors[0].values,
        topK: 2,
        includeMetadata: true
      });

      expect(results.matches).toHaveLength(2);
      expect(results.matches[0].id).toBe('test-1');
    });

    it('should fetch specific vectors', async () => {
      const fetched = await vectorStore.fetch(['test-1']);
      expect(fetched).toHaveLength(1);
      expect(fetched[0].id).toBe('test-1');
    });

    it('should delete vectors', async () => {
      await vectorStore.delete(['test-2']);
      const remaining = await vectorStore.fetch(['test-2']);
      expect(remaining).toHaveLength(0);
    });
  });
}); 