/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side variables
  readonly VITE_GITHUB_USERNAME?: string;
  readonly VITE_GITHUB_USEREMAIL?: string;
  readonly VITE_GOOGLE_SEARCH_ENGINE_ID?: string;

  // Server-side variables
  readonly PERPLEXITY_API_KEY?: string;
  readonly XAI_API_KEY?: string;
  readonly GROQ_API_KEY?: string;
  readonly HUGGINGFACE_TOKEN?: string;
  readonly ANTHROPIC_API_KEY?: string;
  readonly OPENAI_API_KEY?: string;
  readonly GOOGLE_API_KEY?: string;
  readonly SERP_API_KEY?: string;
  readonly TAVILY_API_KEY?: string;
  readonly GITHUB_TOKEN?: string;
  readonly LANGCHAIN_SERVICE_API_KEY?: string;
  readonly LANGCHAIN_PERSONAL_API_KEY?: string;
  readonly PINECONE_API_KEY?: string;

  // Redis configuration
  readonly REDIS_HOST?: string;
  readonly REDIS_PORT?: string;
  readonly REDIS_PASSWORD?: string;
  readonly REDIS_API?: string;
  readonly REDIS_USERNAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 