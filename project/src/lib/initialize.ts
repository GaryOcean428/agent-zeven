import { thoughtLogger } from './logging/thought-logger';
import { config } from './config';
import { agentSystem } from './agents/agent-system';
import { ModelRouter } from './routing/router';
import { MemoryManager } from './memory/memory-manager';
import { GitHubClient } from './github/github-client';
import { PineconeClient } from './vector/pinecone-client';

function checkApiKeys() {
  const status = {
    xai: Boolean(config.apiKeys.xai),
    groq: Boolean(config.apiKeys.groq),
    perplexity: Boolean(config.apiKeys.perplexity),
    huggingface: Boolean(config.apiKeys.huggingface),
    github: Boolean(config.apiKeys.github),
    pinecone: Boolean(config.apiKeys.pinecone)
  };

  const missingKeys = Object.entries(status)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  return {
    valid: missingKeys.length === 0,
    missingKeys,
    status
  };
}

export async function initializeSystem() {
  try {
    thoughtLogger.log('plan', 'Starting system initialization');

    // Check API keys
    const { valid, missingKeys, status } = checkApiKeys();
    
    if (!valid) {
      thoughtLogger.log('warning', 'Missing required API keys', { 
        missingKeys,
        apiKeys: status
      });
    }

    // Initialize core services with fallbacks
    const github = GitHubClient.getInstance();
    const pinecone = PineconeClient.getInstance();
    const modelRouter = ModelRouter.getInstance();
    const memoryManager = MemoryManager.getInstance();

    // Initialize all services concurrently
    const [githubResult, pineconeResult, modelRouterResult, memoryResult] = 
      await Promise.allSettled([
        github.initialize(),
        pinecone.initialize(),
        modelRouter.initialize(),
        memoryManager.initialize()
      ]);

    // Initialize agent system last
    await agentSystem.initialize();

    // Log initialization results
    thoughtLogger.log('success', 'System initialization complete', {
      githubReady: githubResult.status === 'fulfilled',
      pineconeReady: pineconeResult.status === 'fulfilled',
      modelRouterReady: modelRouterResult.status === 'fulfilled',
      memoryManagerReady: memoryResult.status === 'fulfilled',
      agentSystemReady: agentSystem.isInitialized
    });

    // Return true to allow system to function with reduced capabilities
    return true;
  } catch (error) {
    thoughtLogger.log('error', 'System initialization failed', { error });
    // Return true to allow system to function with reduced capabilities
    return true;
  }
}