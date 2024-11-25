import { openDB, type IDBPDatabase } from 'idb';
import { thoughtLogger } from '../logging/thought-logger';

interface DBSchema {
  messages: {
    key: string;
    value: {
      id: string;
      content: string;
      role: string;
      timestamp: number;
    };
    indexes: { 'by-timestamp': number };
  };
  vectors: {
    key: string;
    value: {
      id: string;
      content: string;
      embedding: number[];
      timestamp: number;
    };
  };
}

export class DBClient {
  private static instance: DBClient;
  private db: IDBPDatabase<DBSchema> | null = null;
  private initialized = false;
  private initPromise: Promise<void> | null = null;

  private constructor() {}

  static getInstance(): DBClient {
    if (!DBClient.instance) {
      DBClient.instance = new DBClient();
    }
    return DBClient.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        this.db = await openDB<DBSchema>('gary8-db', 1, {
          upgrade(db) {
            // Messages store
            if (!db.objectStoreNames.contains('messages')) {
              const messagesStore = db.createObjectStore('messages', { keyPath: 'id' });
              messagesStore.createIndex('by-timestamp', 'timestamp');
            }

            // Vectors store
            if (!db.objectStoreNames.contains('vectors')) {
              db.createObjectStore('vectors', { keyPath: 'id' });
            }
          },
          blocking() {
            // Handle blocked events (e.g., when an older version is still open)
            thoughtLogger.log('warning', 'Database blocked by older version');
          },
          terminated() {
            // Handle unexpected database termination
            thoughtLogger.log('error', 'Database connection terminated unexpectedly');
            this.initialized = false;
            this.db = null;
          }
        });

        this.initialized = true;
        thoughtLogger.log('success', 'Database initialized');
      } catch (error) {
        thoughtLogger.log('error', 'Failed to initialize database', { error });
        this.initialized = false;
        this.db = null;
        throw error;
      } finally {
        this.initPromise = null;
      }
    })();

    return this.initPromise;
  }

  async query<T>(storeName: keyof DBSchema, method: 'get' | 'getAll' | 'put' | 'delete', key?: string, value?: any): Promise<T> {
    if (!this.initialized) {
      await this.initialize();
    }

    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const tx = this.db.transaction(storeName, method === 'get' || method === 'getAll' ? 'readonly' : 'readwrite');
      const store = tx.objectStore(storeName);

      let result;
      switch (method) {
        case 'get':
          result = await store.get(key as string);
          break;
        case 'getAll':
          result = await store.getAll();
          break;
        case 'put':
          result = await store.put(value);
          break;
        case 'delete':
          result = await store.delete(key as string);
          break;
      }

      await tx.done;
      return result as T;
    } catch (error) {
      thoughtLogger.log('error', 'Query failed', { error, method, storeName });
      throw error;
    }
  }

  get isInitialized(): boolean {
    return this.initialized;
  }
}

export const dbClient = DBClient.getInstance();