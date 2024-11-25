"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.HUGGINGFACE_TOKEN = exports.GROQ_TOKEN = exports.XAI_TOKEN = exports.SERP_API_KEY = exports.GOOGLE_API_KEY = exports.PERPLEXITY_TOKEN = void 0;
exports.validateApiKeys = validateApiKeys;
// API Keys
exports.PERPLEXITY_TOKEN = process.env.PERPLEXITY_TOKEN || '';
exports.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';
exports.SERP_API_KEY = process.env.SERP_API_KEY || '';
exports.XAI_TOKEN = process.env.XAI_TOKEN || '';
exports.GROQ_TOKEN = process.env.GROQ_TOKEN || '';
exports.HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN || '';
// API Configuration
exports.config = {
    apiKeys: {
        perplexity: exports.PERPLEXITY_TOKEN,
        google: exports.GOOGLE_API_KEY,
        serp: exports.SERP_API_KEY,
        xai: exports.XAI_TOKEN,
        groq: exports.GROQ_TOKEN,
        huggingface: exports.HUGGINGFACE_TOKEN
    },
    services: {
        perplexity: {
            baseUrl: 'https://api.perplexity.ai',
            defaultModel: 'llama-3.1-sonar-large-128k-online',
            maxTokens: 2048,
            temperature: 0.7
        },
        google: {
            baseUrl: 'https://www.googleapis.com/customsearch/v1',
            searchEngineId: 'AIzaSyBYnK6ckkX8gW_Qs4vYGKn2uvd3GyVIooU',
            resultsPerPage: 5
        },
        serp: {
            baseUrl: 'https://serpapi.com/search',
            resultsPerPage: 5
        },
        xai: {
            baseUrl: 'https://api.x.ai/v1',
            defaultModel: 'grok-beta',
            maxTokens: 1024,
            temperature: 0.7
        },
        groq: {
            baseUrl: 'https://api.groq.com/openai/v1',
            models: {
                small: 'llama-3.2-3b-preview',
                medium: 'llama-3.2-7b-preview',
                large: 'llama-3.2-70b-preview',
                toolUse: 'llama-3.2-70b-tool-use'
            },
            maxTokens: 4096,
            temperature: 0.7
        }
    },
    features: {
        enableSearch: true,
        enableMemory: true,
        enableStreaming: true,
        enableDebugMode: false
    }
};
// Function to validate API keys
function validateApiKeys() {
    var missingKeys = [];
    if (!exports.PERPLEXITY_TOKEN)
        missingKeys.push('PERPLEXITY_TOKEN');
    if (!exports.GOOGLE_API_KEY)
        missingKeys.push('GOOGLE_API_KEY');
    if (!exports.SERP_API_KEY)
        missingKeys.push('SERP_API_KEY');
    if (!exports.XAI_TOKEN)
        missingKeys.push('XAI_TOKEN');
    if (!exports.GROQ_TOKEN)
        missingKeys.push('GROQ_TOKEN');
    if (!exports.HUGGINGFACE_TOKEN)
        missingKeys.push('HUGGINGFACE_TOKEN');
    return {
        valid: missingKeys.length === 0,
        missingKeys: missingKeys
    };
}
