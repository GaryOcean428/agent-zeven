/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API Keys
  readonly VITE_OPENAI_API_KEY: string
  readonly VITE_ANTHROPIC_API_KEY: string
  readonly VITE_PINECONE_API_KEY: string
  readonly VITE_PERPLEXITY_API_KEY: string
  readonly VITE_XAI_API_KEY: string
  readonly VITE_GROQ_API_KEY: string
  readonly VITE_HUGGINGFACE_TOKEN: string
  readonly VITE_GOOGLE_API_KEY: string
  readonly VITE_SERP_API_KEY: string
  readonly VITE_TAVILY_API_KEY: string
  readonly VITE_GITHUB_TOKEN: string
  readonly VITE_LANGCHAIN_SERVICE_API_KEY: string
  readonly VITE_LANGCHAIN_PERSONAL_API_KEY: string

  // Configuration
  readonly VITE_API_URL: string
  readonly VITE_PINECONE_ENVIRONMENT: string
  readonly VITE_GOOGLE_SEARCH_ENGINE_ID: string
  readonly VITE_VECTOR_STORE_NAMESPACE: string
  readonly VITE_VECTOR_DIMENSION: string

  // Feature Flags
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_DEBUG: string

  // Build Information
  readonly MODE: string
  readonly BASE_URL: string
  readonly PROD: boolean
  readonly DEV: boolean
  readonly SSR: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 