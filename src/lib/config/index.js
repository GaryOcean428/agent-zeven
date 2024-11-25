"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.validateApiKeys = validateApiKeys;
exports.getApiKeyStatus = getApiKeyStatus;
var zod_1 = require("zod");
var thought_logger_1 = require("../logging/thought-logger");
// API key validation schema
var apiKeysSchema = zod_1.z.object({
    xai: zod_1.z.string().min(1, "X.AI API key is required"),
    groq: zod_1.z.string().min(1, "Groq API key is required"),
    perplexity: zod_1.z.string().min(1, "Perplexity API key is required"),
    huggingface: zod_1.z.string().min(1, "Hugging Face token is required"),
    github: zod_1.z.string().min(1, "GitHub token is required"),
    pinecone: zod_1.z.string().min(1, "Pinecone API key is required")
});
var getEnvVar = function (key) {
    var value = import.meta.env["VITE_".concat(key)];
    if (!value) {
        thought_logger_1.thoughtLogger.log('error', "Environment variable VITE_".concat(key, " is not set"));
        return '';
    }
    return value.trim();
};
exports.config = {
    apiKeys: {
        xai: getEnvVar('XAI_API_KEY'),
        groq: getEnvVar('GROQ_API_KEY'),
        perplexity: getEnvVar('PERPLEXITY_API_KEY'),
        huggingface: getEnvVar('HUGGINGFACE_TOKEN'),
        github: getEnvVar('GITHUB_TOKEN'),
        pinecone: getEnvVar('PINECONE_API_KEY')
    },
    services: {
        pinecone: {
            index: process.env.PINECONE_INDEX || 'agent-one',
            dimension: 3072,
            metric: 'cosine',
            host: process.env.PINECONE_ENV,
            embeddingModel: 'text-embedding-3-large'
        },
        github: {
            baseUrl: 'https://api.github.com',
            apiVersion: '2022-11-28'
        }
    },
    features: {
        enableStreaming: true,
        enableMemory: true,
        enableSearch: true,
        enableGitHub: true
    }
};
function validateApiKeys() {
    thought_logger_1.thoughtLogger.log('execution', 'Validating API keys');
    var result = apiKeysSchema.safeParse(exports.config.apiKeys);
    if (!result.success) {
        var missingKeys = result.error.issues
            .filter(function (issue) { return issue.code === 'too_small'; })
            .map(function (issue) { return issue.path[0]; });
        thought_logger_1.thoughtLogger.log('warning', 'Missing API keys detected', { missingKeys: missingKeys });
        return {
            valid: false,
            missingKeys: missingKeys,
            apiKeys: Object.fromEntries(Object.entries(exports.config.apiKeys).map(function (_a) {
                var key = _a[0], value = _a[1];
                return [key, Boolean(value)];
            }))
        };
    }
    thought_logger_1.thoughtLogger.log('success', 'All API keys validated successfully');
    return {
        valid: true,
        missingKeys: [],
        apiKeys: Object.fromEntries(Object.entries(exports.config.apiKeys).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [key, Boolean(value)];
        }))
    };
}
function getApiKeyStatus() {
    return Object.fromEntries(Object.entries(exports.config.apiKeys).map(function (_a) {
        var key = _a[0], value = _a[1];
        return [key, Boolean(value)];
    }));
}
