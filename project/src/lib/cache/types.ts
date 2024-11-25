export interface CacheConfig {
  ttl: number;
  maxSize: number;
  evictionPolicy: 'lru' | 'lfu';
}

export interface CacheEntry<T> {
  value: T;
  expires: number;
  lastAccessed?: number;
  accessCount?: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  evictions: number;
}