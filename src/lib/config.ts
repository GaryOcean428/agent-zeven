// API Keys
export const PERPLEXITY_TOKEN = process.env.PERPLEXITY_TOKEN || '';
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';
export const SERP_API_KEY = process.env.SERP_API_KEY || '';
export const XAI_TOKEN = process.env.XAI_TOKEN || '';
export const GROQ_TOKEN = process.env.GROQ_TOKEN || '';
export const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN || '';

// API Configuration
export const config = {
  apiKeys: {
    perplexity: PERPLEXITY_TOKEN,
    google: GOOGLE_API_KEY,
    serp: SERP_API_KEY,
    xai: XAI_TOKEN,
    groq: GROQ_TOKEN,
    huggingface: HUGGINGFACE_TOKEN
  },
  services: {
    perplexity: {
      baseUrl: 'https://api.perplexity.ai',
      defaultModel: 'llama-3.1-sonar-large-128k-online',
      maxTokens: 2048,
      temperature: 0.7
    },
    google: {
      baseUrl: 'https://www.googleapis.com/customsearch/v1',
      searchEngineId: 'AIzaSyBYnK6ckkX8gW_Qs4vYGKn2uvd3GyVIooU',
      resultsPerPage: 5
    },
    serp: {
      baseUrl: 'https://serpapi.com/search',
      resultsPerPage: 5
    },
    xai: {
      baseUrl: 'https://api.x.ai/v1',
      defaultModel: 'grok-beta',
      maxTokens: 1024,
      temperature: 0.7
    },
    groq: {
      baseUrl: 'https://api.groq.com/openai/v1',
      models: {
        small: 'llama-3.2-3b-preview',
        medium: 'llama-3.2-7b-preview',
        large: 'llama-3.2-70b-preview',
        toolUse: 'llama-3.2-70b-tool-use'
      },
      maxTokens: 4096,
      temperature: 0.7
    }
  },
  features: {
    enableSearch: true,
    enableMemory: true,
    enableStreaming: true,
    enableDebugMode: false
  }
} as const;

// Function to validate API keys
export function validateApiKeys() {
  const missingKeys: string[] = [];

  if (!PERPLEXITY_TOKEN) missingKeys.push('PERPLEXITY_TOKEN');
  if (!GOOGLE_API_KEY) missingKeys.push('GOOGLE_API_KEY');
  if (!SERP_API_KEY) missingKeys.push('SERP_API_KEY');
  if (!XAI_TOKEN) missingKeys.push('XAI_TOKEN');
  if (!GROQ_TOKEN) missingKeys.push('GROQ_TOKEN');
  if (!HUGGINGFACE_TOKEN) missingKeys.push('HUGGINGFACE_TOKEN');

  return {
    valid: missingKeys.length === 0,
    missingKeys
  };
}
