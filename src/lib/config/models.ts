import { config } from './index';

export const models = {
  // Groq Models
  groq: {
    simple: {
      id: 'llama-3.2-3b-preview',
      description: 'Simple tasks and quick responses',
      maxTokens: 2048,
      temperature: 0.7,
      capabilities: ['basic-chat', 'simple-tasks']
    },
    balanced: {
      id: 'llama-3.2-7b-preview',
      description: 'Balanced performance for general tasks',
      maxTokens: 4096,
      temperature: 0.7,
      capabilities: ['general-chat', 'code-generation', 'analysis']
    },
    advanced: {
      id: 'llama-3.2-70b-preview',
      description: 'Complex tasks and advanced reasoning',
      maxTokens: 8192,
      temperature: 0.7,
      capabilities: ['complex-reasoning', 'expert-analysis', 'advanced-code']
    }
  },

  // Perplexity Models
  perplexity: {
    small: {
      id: 'llama-3.1-sonar-small-128k-online',
      description: '8B parameters, efficient for simple searches',
      maxTokens: 2048,
      temperature: 0.7,
      capabilities: ['web-search', 'information-retrieval']
    },
    large: {
      id: 'llama-3.1-sonar-large-128k-online',
      description: '70B parameters, comprehensive search',
      maxTokens: 4096,
      temperature: 0.7,
      capabilities: ['advanced-search', 'data-synthesis', 'current-events']
    }
  },

  // X.AI Models
  xai: {
    grokBeta: {
      id: 'grok-beta',
      description: 'Expert-level queries and complex reasoning',
      maxTokens: 4096,
      temperature: 0.7,
      capabilities: ['expert-queries', 'complex-reasoning', 'advanced-analysis']
    }
  }
};

export function selectModel(task: string, complexity: number = 0.5): string {
  // Code-related tasks
  if (task.toLowerCase().includes('code') || task.toLowerCase().includes('program')) {
    return complexity > 0.5 ? models.groq.advanced.id : models.groq.balanced.id;
  }

  // Search and information tasks
  if (task.toLowerCase().includes('search') || task.toLowerCase().includes('find')) {
    if (complexity > 0.8) return models.perplexity.large.id;
    return models.perplexity.small.id;
  }

  // Expert-level queries
  if (complexity > 0.8) {
    return models.xai.grokBeta.id;
  }

  // General tasks based on complexity
  if (complexity > 0.7) return models.groq.advanced.id;
  if (complexity > 0.4) return models.groq.balanced.id;
  return models.groq.simple.id;
}

export function getModelCapabilities(modelId: string): string[] {
  const allModels = [
    ...Object.values(models.groq),
    ...Object.values(models.perplexity),
    ...Object.values(models.xai)
  ];

  const model = allModels.find(m => m.id === modelId);
  return model?.capabilities || [];
}