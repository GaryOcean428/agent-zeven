import Redis from 'ioredis';
import { thoughtLogger } from '../logging/thought-logger';
import { AppError } from '../errors/AppError';

export class RedisCache {
  private static instance: RedisCache;
  private client: Redis;
  private initialized = false;

  private constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      }
    });

    this.client.on('error', (error) => {
      thoughtLogger.log('error', 'Redis error', { error });
    });
  }

  static getInstance(): RedisCache {
    if (!RedisCache.instance) {
      RedisCache.instance = new RedisCache();
    }
    return RedisCache.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await this.client.ping();
      this.initialized = true;
      thoughtLogger.log('success', 'Redis connection initialized');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to initialize Redis connection', { error });
      throw new AppError('Cache initialization failed', 'CACHE_ERROR', error);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      thoughtLogger.log('error', 'Cache get failed', { key, error });
      throw new AppError('Cache get failed', 'CACHE_ERROR', error);
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const serialized = JSON.stringify(value);
      if (ttl) {
        await this.client.set(key, serialized, 'EX', ttl);
      } else {
        await this.client.set(key, serialized);
      }
    } catch (error) {
      thoughtLogger.log('error', 'Cache set failed', { key, error });
      throw new AppError('Cache set failed', 'CACHE_ERROR', error);
    }
  }

  async delete(key: string): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      await this.client.del(key);
    } catch (error) {
      thoughtLogger.log('error', 'Cache delete failed', { key, error });
      throw new AppError('Cache delete failed', 'CACHE_ERROR', error);
    }
  }

  async clear(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      await this.client.flushdb();
      thoughtLogger.log('success', 'Cache cleared');
    } catch (error) {
      thoughtLogger.log('error', 'Cache clear failed', { error });
      throw new AppError('Cache clear failed', 'CACHE_ERROR', error);
    }
  }

  async disconnect(): Promise<void> {
    await this.client.quit();
    this.initialized = false;
    thoughtLogger.log('success', 'Redis connection closed');
  }

  get isInitialized(): boolean {
    return this.initialized;
  }
}