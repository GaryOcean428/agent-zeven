// Create proper database schema types
export interface DBSchema {
  'long-term': {
    key: string;
    value: LongTermMemory;
    indexes: {
      'by-timestamp': number;
    };
  };
  'user-info': {
    key: string;
    value: UserInfo;
  };
  'cache': {
    key: string;
    value: CacheEntry;
    indexes: {
      'by-expiry': number;
    };
  };
}

export interface LongTermMemory {
  key: string;
  value: unknown;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface UserInfo {
  key: string;
  value: unknown;
  lastUpdated: number;
}

export interface CacheEntry {
  key: string;
  value: unknown;
  expiry: number;
  type: 'api' | 'search' | 'computation';
}

export interface StorageOptions {
  db?: IDBDatabase;
  store?: IDBObjectStore;
  mode?: IDBTransactionMode;
  index?: string;
}

export type StorageOperation = 'get' | 'put' | 'delete' | 'clear'; 