export interface Message {
  id: string;
  timestamp: number;
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface APIError extends Error {
  status?: number;
  response?: any;
}

export interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}
