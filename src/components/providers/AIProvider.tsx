import React, { createContext, useContext, useCallback } from 'react';
import { AIClient } from '../../lib/ai/client';
import { type AIRequestOptions, type AIResponse } from '../../lib/ai/types';

interface AIContextType {
  generateResponse: (options: AIRequestOptions) => Promise<AIResponse>;
  streamResponse: (options: AIRequestOptions) => Promise<ReadableStream>;
}

const AIContext = createContext<AIContextType | null>(null);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const client = new AIClient();

  const generateResponse = useCallback(async (options: AIRequestOptions) => {
    return client.generateResponse(options);
  }, []);

  const streamResponse = useCallback(async (options: AIRequestOptions) => {
    return client.streamResponse(options);
  }, []);

  return (
    <AIContext.Provider value={{ generateResponse, streamResponse }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
} 