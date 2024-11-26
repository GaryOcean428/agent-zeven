/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side Configuration
  readonly VITE_API_URL: string
  readonly VITE_VECTOR_STORE_NAMESPACE: string
  readonly VITE_VECTOR_DIMENSION: string
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