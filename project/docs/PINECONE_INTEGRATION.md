# Pinecone Integration Guide

## Configuration

### Environment Variables
```env
VITE_PINECONE_API_KEY=your_api_key_here
VITE_PINECONE_HOST=agent-one-ieixnqw.svc.aped-4627-b74a.pinecone.io
VITE_PINECONE_INDEX=agent-one
VITE_PINECONE_DIMENSION=3072
```

### Index Configuration
- **Metric**: cosine
- **Dimensions**: 3072 (optimized for text-embedding-3-large)
- **Region**: us-east-1 (AWS)
- **Mode**: Serverless

## Vector Operations

### Embedding Generation
```typescript
async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input: text,
      model: 'text-embedding-3-large',
      encoding_format: 'float'
    })
  });

  const data = await response.json();
  return data.data[0].embedding;
}
```

### Upsert Operations
```typescript
async function upsertVectors(vectors: {
  id: string;
  values: number[];
  metadata?: Record<string, any>;
}[]): Promise<void> {
  await pinecone.upsert({
    vectors,
    namespace: 'default'
  });
}
```

### Query Operations
```typescript
async function queryVectors(
  vector: number[],
  topK: number = 5,
  filter?: Record<string, any>
): Promise<QueryResponse> {
  return await pinecone.query({
    vector,
    topK,
    filter,
    includeMetadata: true
  });
}
```

## Error Handling

### Rate Limiting
```typescript
class RateLimiter {
  private requests: number[] = [];
  private readonly limit = 100; // requests per minute
  private readonly interval = 60 * 1000; // 1 minute

  async checkLimit(): Promise<void> {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.interval);
    
    if (this.requests.length >= this.limit) {
      const oldestRequest = this.requests[0];
      const waitTime = this.interval - (now - oldestRequest);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.requests.push(now);
  }
}
```

### Error Recovery
```typescript
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }
  }
  
  throw lastError;
}
```

## Best Practices

1. **Vector Management**
   - Batch upsert operations when possible
   - Use namespaces for data organization
   - Implement regular index maintenance
   - Monitor index statistics

2. **Performance Optimization**
   - Cache frequently accessed vectors
   - Use appropriate batch sizes
   - Implement connection pooling
   - Monitor query latency

3. **Security**
   - Rotate API keys regularly
   - Validate input data
   - Implement access controls
   - Monitor usage patterns

4. **Monitoring**
   - Track API usage
   - Monitor error rates
   - Set up alerts for anomalies
   - Regular performance audits

## Testing

### Unit Tests
```typescript
describe('PineconeClient', () => {
  it('should generate valid embeddings', async () => {
    const text = 'Sample text';
    const embedding = await generateEmbedding(text);
    expect(embedding).toHaveLength(3072);
  });

  it('should handle upsert operations', async () => {
    const vector = {
      id: 'test-1',
      values: new Array(3072).fill(0),
      metadata: { source: 'test' }
    };
    await expect(upsertVectors([vector])).resolves.not.toThrow();
  });
});
```

### Integration Tests
```typescript
describe('Pinecone Integration', () => {
  it('should perform end-to-end vector operations', async () => {
    // Generate embedding
    const text = 'Test document';
    const embedding = await generateEmbedding(text);

    // Upsert vector
    const id = crypto.randomUUID();
    await upsertVectors([{
      id,
      values: embedding,
      metadata: { text }
    }]);

    // Query vector
    const results = await queryVectors(embedding, 1);
    expect(results.matches[0].id).toBe(id);
  });
});
```

## Troubleshooting

1. **Connection Issues**
   - Verify API key and environment variables
   - Check network connectivity
   - Validate index configuration
   - Review error logs

2. **Performance Issues**
   - Monitor query latency
   - Check batch sizes
   - Review index statistics
   - Optimize vector operations

3. **Data Quality**
   - Validate embedding dimensions
   - Check metadata format
   - Verify vector normalization
   - Monitor similarity scores