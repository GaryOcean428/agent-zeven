import Redis from 'ioredis';
import { thoughtLogger } from '../logging/thought-logger';
import { AppError } from '../errors/AppError';

export class RedisClient {
  private static instance: RedisClient;
  private client: Redis;
  private initialized = false;
  private retryAttempts = 0;
  private readonly maxRetries = 3;

  private constructor() {
    this.client = new Redis({
      host: import.meta.env.REDIS_HOST || 'localhost',
      port: parseInt(import.meta.env.REDIS_PORT || '6379'),
      password: import.meta.env.REDIS_PASSWORD,
      db: parseInt(import.meta.env.REDIS_DB || '0'),
      retryStrategy: (times) => {
        if (times > this.maxRetries) {
          thoughtLogger.log('error', 'Max Redis retry attempts reached');
          return null;
        }
        const delay = Math.min(times * 50, 2000);
        thoughtLogger.log('warning', `Retrying Redis connection in ${delay}ms`);
        return delay;
      },
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      connectTimeout: 10000,
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.client.on('connect', () => {
      thoughtLogger.log('success', 'Redis client connected');
    });

    this.client.on('error', (error) => {
      thoughtLogger.log('error', 'Redis client error', { error });
    });

    this.client.on('ready', () => {
      this.initialized = true;
      thoughtLogger.log('success', 'Redis client ready');
    });

    this.client.on('close', () => {
      this.initialized = false;
      thoughtLogger.log('warning', 'Redis connection closed');
    });
  }

  static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await this.client.ping();
      this.initialized = true;
      thoughtLogger.log('success', 'Redis connection initialized');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to initialize Redis connection', { error });
      throw new AppError('Redis initialization failed', 'CACHE_ERROR', error);
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
      thoughtLogger.log('error', 'Redis get operation failed', { key, error });
      throw new AppError('Cache get operation failed', 'CACHE_ERROR', error);
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
      thoughtLogger.log('error', 'Redis set operation failed', { key, error });
      throw new AppError('Cache set operation failed', 'CACHE_ERROR', error);
    }
  }

  async delete(key: string): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      await this.client.del(key);
    } catch (error) {
      thoughtLogger.log('error', 'Redis delete operation failed', { key, error });
      throw new AppError('Cache delete operation failed', 'CACHE_ERROR', error);
    }
  }

  async clear(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      await this.client.flushdb();
      thoughtLogger.log('success', 'Redis cache cleared');
    } catch (error) {
      thoughtLogger.log('error', 'Redis clear operation failed', { error });
      throw new AppError('Cache clear operation failed', 'CACHE_ERROR', error);
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.quit();
      this.initialized = false;
      thoughtLogger.log('success', 'Redis connection closed');
    }
  }

  get isInitialized(): boolean {
    return this.initialized;
  }
}

export const redisClient = RedisClient.getInstance();