/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_XAI_API_KEY: string
  readonly VITE_GROQ_API_KEY: string
  readonly VITE_PERPLEXITY_API_KEY: string
  readonly VITE_HUGGINGFACE_TOKEN: string
  readonly VITE_GITHUB_TOKEN: string
  readonly VITE_PINECONE_API_KEY: string
  readonly VITE_PINECONE_ENVIRONMENT: string
  readonly VITE_PINECONE_INDEX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}