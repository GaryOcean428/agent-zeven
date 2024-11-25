import { thoughtLogger } from '../logging/thought-logger';
import { AppError } from '../errors/AppError';

export class StorageClient {
  private static instance: StorageClient;
  private cache: Map<string, { value: any; expires: number }>;
  private initialized = false;

  private constructor() {
    this.cache = new Map();
  }

  static getInstance(): StorageClient {
    if (!StorageClient.instance) {
      StorageClient.instance = new StorageClient();
    }
    return StorageClient.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      this.initialized = true;
      thoughtLogger.log('success', 'Storage client initialized');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to initialize storage client', { error });
      throw new AppError('Storage initialization failed', 'CACHE_ERROR', error);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.initialized) {
      await this.initialize();
    }

    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }

    return item.value as T;
  }

  async set(key: string, value: any, ttl: number = 300): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    this.cache.set(key, {
      value,
      expires: Date.now() + ttl * 1000
    });

    // Clean up expired items
    this.cleanup();
  }

  async delete(key: string): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expires) {
        this.cache.delete(key);
      }
    }
  }

  get isInitialized(): boolean {
    return this.initialized;
  }
}

export const storageClient = StorageClient.getInstance();