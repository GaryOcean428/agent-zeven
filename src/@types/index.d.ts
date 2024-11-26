// Config Types
interface Config {
  apiKeys: {
    perplexity: string;
    google: string;
    serp: string;
    xai: string;
    groq: string;
    huggingface: string;
    github: string;
    pinecone: string;
    openai: string;
    tavily: string;
  };
  services: {
    perplexity: {
      baseUrl: string;
      defaultModel: string;
      maxTokens: number;
      temperature: number;
    };
    google: {
      baseUrl: string;
      searchEngineId: string;
      resultsPerPage: number;
    };
    serp: {
      baseUrl: string;
      resultsPerPage: number;
    };
    xai: {
      baseUrl: string;
      defaultModel: string;
      maxTokens: number;
      temperature: number;
    };
    groq: {
      baseUrl: string;
      models: {
        small: string;
        medium: string;
        large: string;
        toolUse: string;
      };
      maxTokens: number;
      temperature: number;
    };
    github?: {
      baseUrl: string;
      apiVersion: string;
    };
    pinecone?: {
      host: string;
      index: string;
      dimension: number;
    };
  };
  features: {
    enableSearch: boolean;
    enableMemory: boolean;
    enableStreaming: boolean;
    enableDebugMode: boolean;
    [key: string]: boolean;
  };
}

// Message Types
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

// Error Types
interface ProcessingError {
  code: string;
  message: string;
  details?: unknown;
}

// Tool Types
interface Tool {
  name: string;
  description: string;
  execute: (params: Record<string, unknown>) => Promise<unknown>;
}

// Search Types
interface SearchOptions {
  limit?: number;
  offset?: number;
  filters?: Record<string, unknown>;
}

// Theme Types
interface ThemeConfig {
  dark: boolean;
  system: boolean;
}

// Test Types
declare global {
  namespace Vi {
    interface Assertion extends jest.Matchers<void, any> {}
    interface AsymmetricMatchersContaining extends jest.Matchers<void, any> {}
  }
}

// Export type declarations
declare module 'types' {
  export type { 
    Config,
    Message,
    ProcessingError,
    Tool,
    SearchOptions,
    ThemeConfig
  };
}
