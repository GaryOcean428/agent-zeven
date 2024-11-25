# Gary8 Setup Guide

## Prerequisites

### Required API Keys
```plaintext
VITE_XAI_API_KEY=your_xai_api_key_here          # Required for Grok models
VITE_GROQ_API_KEY=your_groq_api_key_here        # Required for Llama models
VITE_PERPLEXITY_API_KEY=your_perplexity_api_key # Required for Sonar models
VITE_HUGGINGFACE_TOKEN=your_huggingface_token   # Required for Granite models
VITE_GITHUB_TOKEN=your_github_token             # Required for GitHub integration
```

### Optional Search API Keys
```plaintext
VITE_TAVILY_API_KEY=your_tavily_api_key_here
VITE_GOOGLE_API_KEY=your_google_api_key_here
VITE_GOOGLE_SEARCH_ENGINE_ID=your_google_search_engine_id_here
VITE_SERP_API_KEY=your_serp_api_key_here
```

### Vector Storage
```plaintext
VITE_PINECONE_API_KEY=your_pinecone_api_key
VITE_PINECONE_ENVIRONMENT=your_pinecone_environment
VITE_PINECONE_INDEX=your_pinecone_index
```

## Installation

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd gary8
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Features

### Core Features
- Multi-agent collaboration
- Vector memory system
- Model routing
- Real-time thought logging
- GitHub integration
- Competitor analysis
- Document management
- Canvas design system

### Panels
1. **Chat Panel**
   - Real-time conversation
   - Multi-model support
   - Context awareness
   - Memory integration

2. **Canvas Panel**
   - AI-powered design generation
   - Component-based layouts
   - Export to React/HTML
   - Real-time collaboration

3. **Agent Panel**
   - Agent status monitoring
   - Task delegation
   - Performance metrics
   - System health

4. **Tools Panel**
   - Web data tools
   - GitHub integration
   - Competitor analysis
   - Export utilities

5. **Documents Panel**
   - Document management
   - Vector search
   - Auto-tagging
   - Version control

6. **Search Panel**
   - Multi-provider search
   - RAG processing
   - MoA aggregation
   - Real-time results

## Error Handling

1. **API Errors**
   - Rate limiting
   - Authentication failures
   - Network timeouts
   - Graceful fallbacks

2. **Storage Errors**
   - Cache misses
   - Storage limits
   - Persistence failures
   - Data validation

3. **System Errors**
   - Resource constraints
   - Performance degradation
   - Component failures
   - Recovery procedures

## Best Practices

1. **Performance**
   - Use caching strategies
   - Implement lazy loading
   - Optimize API calls
   - Monitor memory usage

2. **Security**
   - Validate API keys
   - Sanitize inputs
   - Handle sensitive data
   - Implement rate limiting

3. **Development**
   - Follow TypeScript best practices
   - Write comprehensive tests
   - Document code changes
   - Use proper error handling

## Troubleshooting

1. **Common Issues**
   - API key validation errors
   - Storage initialization failures
   - Network connectivity issues
   - Resource constraints

2. **Solutions**
   - Verify API keys in .env
   - Check network connectivity
   - Monitor system resources
   - Review error logs

## Support

For issues and support:
1. Check the documentation
2. Review error logs
3. Submit GitHub issues
4. Contact support team