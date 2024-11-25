import { PineconeClient } from '@pinecone-database/pinecone';
import { PineconeStoreClient } from '../pinecone-store-client';
import { VectorStoreConfig, Vector, VectorQuery } from '../types';

// Mock PineconeClient
jest.mock('@pinecone-database/pinecone');
jest.mock('../../logging/thought-logger');

describe('PineconeStoreClient', () => {
  let client: PineconeStoreClient;
  let mockPineconeClient: jest.Mocked<PineconeClient>;

  const mockConfig: VectorStoreConfig = {
    dimension: 384,
    metric: 'cosine',
    namespace: 'test-namespace',
    batchSize: 100,
    maxRetries: 3,
    apiKeys: {
      pinecone: 'test-api-key'
    },
    services: {
      pinecone: {
        environment: 'test-env',
        indexName: 'test-index'
      }
    }
  };

  const mockVectors: Vector[] = [
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

  beforeEach(() => {
    jest.clearAllMocks();
    client = new PineconeStoreClient();
    mockPineconeClient = PineconeClient as jest.Mocked<typeof PineconeClient>;
  });

  describe('initialize', () => {
    it('should initialize successfully with valid config', async () => {
      mockPineconeClient.prototype.init.mockResolvedValueOnce(undefined);
      mockPineconeClient.prototype.listIndexes.mockResolvedValueOnce(['test-index']);

      await client.initialize(mockConfig);
      
      expect(mockPineconeClient.prototype.init).toHaveBeenCalledWith({
        apiKey: 'test-api-key',
        environment: 'test-env'
      });
    });

    it('should throw error if Pinecone API key is missing', async () => {
      const invalidConfig = { ...mockConfig, apiKeys: {} };
      
      await expect(client.initialize(invalidConfig))
        .rejects
        .toThrow('Pinecone API key not configured');
    });

    it('should throw error if index does not exist', async () => {
      mockPineconeClient.prototype.init.mockResolvedValueOnce(undefined);
      mockPineconeClient.prototype.listIndexes.mockResolvedValueOnce(['other-index']);

      await expect(client.initialize(mockConfig))
        .rejects
        .toThrow('Pinecone index test-index not found');
    });
  });

  describe('upsert', () => {
    beforeEach(async () => {
      mockPineconeClient.prototype.init.mockResolvedValueOnce(undefined);
      mockPineconeClient.prototype.listIndexes.mockResolvedValueOnce(['test-index']);
      await client.initialize(mockConfig);
    });

    it('should upsert vectors successfully', async () => {
      const mockIndex = {
        upsert: jest.fn().mockResolvedValueOnce({ upsertedCount: 2 })
      };
      mockPineconeClient.prototype.Index.mockReturnValueOnce(mockIndex as any);

      const result = await client.upsert(mockVectors);

      expect(result).toEqual(['test-1', 'test-2']);
      expect(mockIndex.upsert).toHaveBeenCalledWith({
        upsertRequest: {
          vectors: mockVectors.map(v => ({
            id: v.id,
            values: v.values,
            metadata: v.metadata
          })),
          namespace: 'test-namespace'
        }
      });
    });

    it('should handle batch processing correctly', async () => {
      const largeVectorSet = Array(250).fill(null).map((_, i) => ({
        id: `test-${i}`,
        values: Array(384).fill(0.1),
        metadata: { source: 'test' }
      }));

      const mockIndex = {
        upsert: jest.fn().mockResolvedValue({ upsertedCount: 100 })
      };
      mockPineconeClient.prototype.Index.mockReturnValue(mockIndex as any);

      await client.upsert(largeVectorSet);

      expect(mockIndex.upsert).toHaveBeenCalledTimes(3);
    });
  });

  describe('query', () => {
    beforeEach(async () => {
      mockPineconeClient.prototype.init.mockResolvedValueOnce(undefined);
      mockPineconeClient.prototype.listIndexes.mockResolvedValueOnce(['test-index']);
      await client.initialize(mockConfig);
    });

    it('should query vectors successfully', async () => {
      const mockQuery: VectorQuery = {
        vector: Array(384).fill(0.1),
        topK: 5,
        namespace: 'test-namespace',
        includeMetadata: true
      };

      const mockQueryResponse = {
        matches: [
          {
            id: 'test-1',
            score: 0.9,
            values: Array(384).fill(0.1),
            metadata: { source: 'test' }
          }
        ]
      };

      const mockIndex = {
        query: jest.fn().mockResolvedValueOnce(mockQueryResponse)
      };
      mockPineconeClient.prototype.Index.mockReturnValueOnce(mockIndex as any);

      const result = await client.query(mockQuery);

      expect(result.matches).toHaveLength(1);
      expect(result.matches[0].id).toBe('test-1');
      expect(mockIndex.query).toHaveBeenCalledWith({
        queryRequest: {
          vector: mockQuery.vector,
          topK: 5,
          namespace: 'test-namespace',
          includeMetadata: true,
          filter: undefined
        }
      });
    });
  });

  describe('delete', () => {
    beforeEach(async () => {
      mockPineconeClient.prototype.init.mockResolvedValueOnce(undefined);
      mockPineconeClient.prototype.listIndexes.mockResolvedValueOnce(['test-index']);
      await client.initialize(mockConfig);
    });

    it('should delete vectors successfully', async () => {
      const mockIndex = {
        delete1: jest.fn().mockResolvedValueOnce(undefined)
      };
      mockPineconeClient.prototype.Index.mockReturnValueOnce(mockIndex as any);

      await client.delete(['test-1', 'test-2']);

      expect(mockIndex.delete1).toHaveBeenCalledWith({
        ids: ['test-1', 'test-2'],
        namespace: 'test-namespace'
      });
    });
  });

  describe('fetch', () => {
    beforeEach(async () => {
      mockPineconeClient.prototype.init.mockResolvedValueOnce(undefined);
      mockPineconeClient.prototype.listIndexes.mockResolvedValueOnce(['test-index']);
      await client.initialize(mockConfig);
    });

    it('should fetch vectors successfully', async () => {
      const mockFetchResponse = {
        vectors: {
          'test-1': {
            id: 'test-1',
            values: Array(384).fill(0.1),
            metadata: { source: 'test' }
          }
        }
      };

      const mockIndex = {
        fetch: jest.fn().mockResolvedValueOnce(mockFetchResponse)
      };
      mockPineconeClient.prototype.Index.mockReturnValueOnce(mockIndex as any);

      const result = await client.fetch(['test-1']);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('test-1');
      expect(mockIndex.fetch).toHaveBeenCalledWith({
        ids: ['test-1'],
        namespace: 'test-namespace'
      });
    });
  });
}); 