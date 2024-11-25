export interface Message {
  id: string;
  content: string;
  timestamp: number;
  type: 'user' | 'response' | 'error';
  status?: 'sending' | 'sent' | 'error';
  metadata?: {
    model?: string;
    tokens?: number;
    processingTime?: number;
  };
}
