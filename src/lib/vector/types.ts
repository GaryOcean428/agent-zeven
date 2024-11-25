// Vector Types
export interface Vector {
  id: string;
  values: number[];
  metadata?: Record<string, unknown>;
}

export interface VectorMetadata {
  timestamp: number;
  source: string;
  type: 'document' | 'message' | 'memory';
  context?: string;
}

// Vector Store Configuration
export interface VectorStoreConfig {
  dimension: number;
  metric?: 'cosine' | 'euclidean' | 'dotProduct';
  namespace?: string;
  batchSize?: number;
  maxRetries?: number;
}

// Vector Operations
export interface VectorOperation {
  type: 'upsert' | 'query' | 'delete' | 'fetch';
  vectors?: Vector[];
  ids?: string[];
  topK?: number;
  filter?: VectorFilter;
}

// Vector Query
export interface VectorQuery {
  vector: number[];
  topK?: number;
  filter?: VectorFilter;
  namespace?: string;
  includeMetadata?: boolean;
}

// Vector Filter
export interface VectorFilter {
  source?: string;
  type?: string;
  timestamp?: {
    gt?: number;
    lt?: number;
  };
  metadata?: Record<string, unknown>;
}

// Vector Store Response
export interface VectorQueryResponse {
  matches: Array<{
    id: string;
    score: number;
    values?: number[];
    metadata?: VectorMetadata;
  }>;
  namespace: string;
}

// Vector Store Error
export interface VectorStoreError extends Error {
  code: 'INITIALIZATION_ERROR' | 'OPERATION_ERROR' | 'QUERY_ERROR' | 'CONNECTION_ERROR';
  operation?: VectorOperation;
  details?: unknown;
}

// Vector Store Client Interface
export interface VectorStoreClient {
  initialize(config: VectorStoreConfig): Promise<void>;
  upsert(vectors: Vector[]): Promise<string[]>;
  query(query: VectorQuery): Promise<VectorQueryResponse>;
  delete(ids: string[]): Promise<void>;
  fetch(ids: string[]): Promise<Vector[]>;
  close(): Promise<void>;
}

// Vector Store Events
export type VectorStoreEvent = {
  type: 'connect' | 'disconnect' | 'error' | 'warning';
  timestamp: number;
  details?: unknown;
}

// Vector Store Metrics
export interface VectorStoreMetrics {
  totalVectors: number;
  namespaces: Record<string, number>;
  operations: {
    upserts: number;
    queries: number;
    deletes: number;
    fetches: number;
  };
  performance: {
    averageQueryTime: number;
    averageUpsertTime: number;
  };
} 