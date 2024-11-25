import { StorageClient } from './storage-client';
import { thoughtLogger } from '../logging/thought-logger';
import { AppError } from '../errors/AppError';

interface CacheOptions {
  ttl?: number;
  namespace?: string;
}

export class CacheManager {
  private static instance: CacheManager;
  private storage: StorageClient;
  private memoryCache: Map<string, { value: any; expires: number }>;
  private initialized = false;

  private constructor() {
    this.storage = StorageClient.getInstance();
    this.memoryCache = new Map();
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await this.storage.initialize();
      this.initialized = true;
      thoughtLogger.log('success', 'Cache manager initialized');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to initialize cache manager', { error });
      throw error;
    }
  }

  private getFullKey(key: string, namespace?: string): string {
    return namespace ? `${namespace}:${key}` : key;
  }

  async get<T>(key: string, options: CacheOptions = {}): Promise<T | null> {
    const fullKey = this.getFullKey(key, options.namespace);

    // Check memory cache first
    const memoryItem = this.memoryCache.get(fullKey);
    if (memoryItem) {
      if (Date.now() < memoryItem.expires) {
        return memoryItem.value as T;
      }
      this.memoryCache.delete(fullKey);
    }

    // Check persistent storage
    try {
      const value = await this.storage.get<T>(fullKey);
      if (value) {
        // Update memory cache
        this.memoryCache.set(fullKey, {
          value,
          expires: Date.now() + (options.ttl || 300) * 1000
        });
      }
      return value;
    } catch (error) {
      thoughtLogger.log('error', 'Cache get failed', { key: fullKey, error });
      return null;
    }
  }

  async set(key: string, value: any, options: CacheOptions = {}): Promise<void> {
    const fullKey = this.getFullKey(key, options.namespace);
    const ttl = options.ttl || 300; // 5 minutes default

    try {
      // Set in persistent storage
      await this.storage.set(fullKey, value, ttl);

      // Update memory cache
      this.memoryCache.set(fullKey, {
        value,
        expires: Date.now() + ttl * 1000
      });

      // Clean up expired memory cache entries
      this.cleanMemoryCache();
    } catch (error) {
      thoughtLogger.log('error', 'Cache set failed', { key: fullKey, error });
      throw new AppError('Failed to set cache value', 'CACHE_ERROR', error);
    }
  }

  async delete(key: string, namespace?: string): Promise<void> {
    const fullKey = this.getFullKey(key, namespace);

    try {
      await this.storage.delete(fullKey);
      this.memoryCache.delete(fullKey);
    } catch (error) {
      thoughtLogger.log('error', 'Cache delete failed', { key: fullKey, error });
      throw new AppError('Failed to delete cache value', 'CACHE_ERROR', error);
    }
  }

  async clear(namespace?: string): Promise<void> {
    try {
      if (namespace) {
        // Clear storage keys by namespace
        await this.storage.clear();
        
        // Clear memory cache for namespace
        for (const key of this.memoryCache.keys()) {
          if (key.startsWith(namespace)) {
            this.memoryCache.delete(key);
          }
        }
      } else {
        await this.storage.clear();
        this.memoryCache.clear();
      }
    } catch (error) {
      thoughtLogger.log('error', 'Cache clear failed', { namespace, error });
      throw new AppError('Failed to clear cache', 'CACHE_ERROR', error);
    }
  }

  private cleanMemoryCache(): void {
    const now = Date.now();
    for (const [key, item] of this.memoryCache.entries()) {
      if (now >= item.expires) {
        this.memoryCache.delete(key);
      }
    }
  }

  get isInitialized(): boolean {
    return this.initialized;
  }
}

export const cacheManager = CacheManager.getInstance();