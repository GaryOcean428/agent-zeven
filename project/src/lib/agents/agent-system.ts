import { thoughtLogger } from '../logging/thought-logger';
import { ModelRouter } from '../routing/router';
import { MemoryManager } from '../memory/memory-manager';
import type { Message } from '../types';

export class AgentSystem {
  private static instance: AgentSystem;
  private modelRouter: ModelRouter;
  private memoryManager: MemoryManager;
  private initialized = false;

  private constructor() {
    this.modelRouter = ModelRouter.getInstance();
    this.memoryManager = MemoryManager.getInstance();
  }

  static getInstance(): AgentSystem {
    if (!AgentSystem.instance) {
      AgentSystem.instance = new AgentSystem();
    }
    return AgentSystem.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      thoughtLogger.log('plan', 'Initializing agent system');

      // Initialize core systems
      await Promise.all([
        this.modelRouter.initialize(),
        this.memoryManager.initialize()
      ]);

      this.initialized = true;
      thoughtLogger.log('success', 'Agent system initialized');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to initialize agent system', { error });
      // Allow system to function with reduced capabilities
      this.initialized = true;
    }
  }

  async processMessage(
    content: string,
    onProgress?: (content: string) => void,
    onStateChange?: (state: string) => void
  ): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    const messageId = crypto.randomUUID();
    thoughtLogger.log('plan', 'Processing message', { messageId });

    try {
      // Create message object
      const message: Message = {
        id: messageId,
        role: 'user',
        content,
        timestamp: Date.now()
      };

      // Route to appropriate model
      const routerConfig = await this.modelRouter.route(content, []);
      thoughtLogger.log('decision', `Selected model: ${routerConfig.model}`, {
        confidence: routerConfig.confidence
      });

      // Process with selected model
      const response = await this.modelRouter.processWithModel(
        message,
        routerConfig,
        onProgress
      );

      // Store in memory
      await this.memoryManager.storeMessage(message);
      await this.memoryManager.storeMessage(response);

      thoughtLogger.log('success', 'Message processed successfully', {
        messageId,
        model: routerConfig.model
      });
    } catch (error) {
      thoughtLogger.log('error', 'Message processing failed', {
        messageId,
        error
      });
      throw error;
    }
  }

  get isInitialized(): boolean {
    return this.initialized;
  }
}

export const agentSystem = AgentSystem.getInstance();