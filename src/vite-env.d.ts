/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side safe variables
  readonly VITE_GITHUB_USERNAME: string
  readonly VITE_GITHUB_USEREMAIL: string
  readonly VITE_GOOGLE_SEARCH_ENGINE_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
