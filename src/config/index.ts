interface ApiKeys {
  xai: string;
  groq: string;
  perplexity: string;
  huggingface: string;
  github: string;
}

interface XaiService {
  baseUrl: string;
  apiVersion: string;
  defaultModel: string;
  maxTokens: number;
  temperature: number;
  rateLimits: {
    requestsPerMinute: number;
    tokensPerMinute: number;
  };
}

interface GroqService {
  baseUrl: string;
  models: {
    small: string;
    medium: string;
    large: string;
  };
  maxTokens: number;
  temperature: number;
}

interface PerplexityService {
  baseUrl: string;
  defaultModel: string;
  maxTokens: number;
  temperature: number;
}

interface GitHubService {
  baseUrl: string;
  apiVersion: string;
}

interface Services {
  xai: XaiService;
  groq: GroqService;
  perplexity: PerplexityService;
  github: GitHubService;
}

interface Features {
  enableStreaming: boolean;
  enableMemory: boolean;
  enableSearch: boolean;
}

export interface Config {
  apiKeys: ApiKeys;
  services: Services;
  features: Features;
}

export const config: Config = {
  apiKeys: {
    xai: import.meta.env.VITE_XAI_API_KEY || '',
    groq: import.meta.env.VITE_GROQ_API_KEY || '',
    perplexity: import.meta.env.VITE_PERPLEXITY_API_KEY || '',
    huggingface: import.meta.env.VITE_HUGGINGFACE_TOKEN || '',
    github: import.meta.env.VITE_GITHUB_TOKEN || ''
  },
  services: {
    xai: {
      baseUrl: 'https://api.x.ai/v1',
      apiVersion: '2024-01',
      defaultModel: 'grok-beta',
      maxTokens: 4096,
      temperature: 0.7,
      rateLimits: {
        requestsPerMinute: 60,
        tokensPerMinute: 100000
      }
    },
    groq: {
      baseUrl: 'https://api.groq.com/openai/v1',
      models: {
        small: 'llama-3.2-3b-preview',
        medium: 'llama-3.2-7b-preview',
        large: 'llama-3.2-70b-preview'
      },
      maxTokens: 4096,
      temperature: 0.7
    },
    perplexity: {
      baseUrl: 'https://api.perplexity.ai',
      defaultModel: 'llama-3.1-sonar-large-128k-online',
      maxTokens: 2048,
      temperature: 0.7
    },
    github: {
      baseUrl: 'https://api.github.com',
      apiVersion: '2022-11-28'
    }
  },
  features: {
    enableStreaming: true,
    enableMemory: true,
    enableSearch: true
  }
};

export type ThoughtType = 'plan' | 'action' | 'success' | 'error' | 'warning' | 'info';
