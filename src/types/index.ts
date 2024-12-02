import { type ReactNode } from 'react';

export type ThoughtType = 'info' | 'warning' | 'error' | 'success' | 'plan' | 'decision' | 'execution';

export interface Message {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ProcessingResult {
  success: boolean;
  message: string;
  data?: any;
}

export interface SavedChat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface SearchResult {
  id: string;
  type: 'answer' | 'document' | 'web';
  content: string;
  title?: string;
  url?: string;
  score?: number;
}

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
}

export type AgentCapability = 
  | 'web-search'
  | 'self-reflection'
  | 'code-execution'
  | 'data-analysis'
  | 'content-generation'
  | 'task-planning'
  | 'tool-usage'
  | 'memory-access'
  | 'agent-communication'
  | 'error-handling';

export interface Tool {
  name: string;
  description: string;
  execute: (params: Record<string, any>) => Promise<any>;
}

export interface ProcessingError extends Error {
  code: string;
  details?: Record<string, any>;
}

export interface Settings {
  theme: ThemeConfig;
  notifications: {
    enabled: boolean;
    sound: boolean;
    showErrors: boolean;
    showSuccess: boolean;
  };
  memory: {
    enabled: boolean;
    contextSize: number;
    memoryLimit: number;
    vectorMemoryEnabled: boolean;
  };
  performance: {
    enabled: boolean;
    maxConcurrentTasks: number;
    taskTimeout: number;
  };
}

export type StoreState = {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
}

export interface LayoutProps {
  children: ReactNode;
}
