import { thoughtLogger } from '../logging/thought-logger';
import type { Message } from '../types';

export class MemoryManager {
  private static instance: MemoryManager;
  private initialized = false;
  private messages: Message[] = [];
  private maxMessages = 1000;

  private constructor() {}

  static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Initialize with in-memory storage
      this.initialized = true;
      thoughtLogger.log('success', 'Memory manager initialized with in-memory storage');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to initialize memory manager', { error });
      throw error;
    }
  }

  async storeMessage(message: Message): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      this.messages.push(message);
      
      // Keep only recent messages
      if (this.messages.length > this.maxMessages) {
        this.messages = this.messages.slice(-this.maxMessages);
      }

      thoughtLogger.log('success', 'Message stored successfully', {
        messageId: message.id
      });
    } catch (error) {
      thoughtLogger.log('error', 'Failed to store message', { error });
      throw error;
    }
  }

  async getRelevantContext(query: string, limit = 5): Promise<Message[]> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Simple relevance scoring based on text similarity
      const scored = this.messages.map(message => ({
        message,
        score: this.calculateSimilarity(query, message.content)
      }));

      // Sort by score and return top matches
      return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.message);
    } catch (error) {
      thoughtLogger.log('error', 'Failed to get relevant context', { error });
      throw error;
    }
  }

  private calculateSimilarity(a: string, b: string): number {
    const wordsA = new Set(a.toLowerCase().split(/\s+/));
    const wordsB = new Set(b.toLowerCase().split(/\s+/));
    
    const intersection = new Set(
      Array.from(wordsA).filter(word => wordsB.has(word))
    );
    
    const union = new Set([...wordsA, ...wordsB]);
    
    return intersection.size / union.size;
  }

  async clearMemory(): Promise<void> {
    try {
      this.messages = [];
      thoughtLogger.log('success', 'Memory cleared successfully');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to clear memory', { error });
      throw error;
    }
  }

  get isInitialized(): boolean {
    return this.initialized;
  }
}