import { thoughtLogger } from '../logging/thought-logger';
import { CodeAwareness } from './code-awareness';
import { GitHubClient } from '../github/github-client';
import { CodespaceClient } from '../github/codespace-client';
import { agentSystem } from '../agents/agent-system';
import { ModelRouter } from '../routing/router';
import { MemoryManager } from '../memory/memory-manager';
import { PostgresClient } from '../db/postgres';
import { RedisCache } from '../cache/redis';

export class SystemInitializer {
  private static instance: SystemInitializer;
  private initialized = false;

  private constructor() {}

  static getInstance(): SystemInitializer {
    if (!SystemInitializer.instance) {
      SystemInitializer.instance = new SystemInitializer();
    }
    return SystemInitializer.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      thoughtLogger.log('plan', 'Starting system initialization');

      // Initialize storage systems with fallbacks
      await this.initializeStorage();

      // Initialize code awareness first to enable self-awareness
      const codeAwareness = CodeAwareness.getInstance();
      await codeAwareness.initialize();

      // Initialize core systems in parallel
      const [modelRouter, memoryManager] = await Promise.all([
        ModelRouter.getInstance().initialize(),
        MemoryManager.getInstance().initialize()
      ]);

      // Initialize agent system
      await agentSystem.initialize();

      this.initialized = true;
      thoughtLogger.log('success', 'System initialization complete', {
        codeAwareness: codeAwareness.isInitialized,
        modelRouter: modelRouter.isInitialized,
        memoryManager: memoryManager.isInitialized,
        agentSystem: agentSystem.isInitialized
      });
    } catch (error) {
      thoughtLogger.log('error', 'System initialization failed', { error });
      // Don't rethrow - allow system to function with reduced capabilities
      this.initialized = true;
    }
  }

  private async initializeStorage(): Promise<void> {
    try {
      // Try PostgreSQL
      if (process.env.POSTGRES_HOST) {
        const db = PostgresClient.getInstance();
        await db.initialize();
        thoughtLogger.log('success', 'PostgreSQL initialized');
      } else {
        thoughtLogger.log('warning', 'PostgreSQL not configured, using in-memory storage');
      }

      // Try Redis
      if (process.env.REDIS_HOST) {
        const cache = RedisCache.getInstance();
        await cache.initialize();
        thoughtLogger.log('success', 'Redis initialized');
      } else {
        thoughtLogger.log('warning', 'Redis not configured, using in-memory cache');
      }
    } catch (error) {
      thoughtLogger.log('warning', 'Storage initialization failed, using fallbacks', { error });
    }
  }

  get isInitialized(): boolean {
    return this.initialized;
  }
}