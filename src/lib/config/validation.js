"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateApiKeys = validateApiKeys;
exports.getApiKeyStatus = getApiKeyStatus;
var zod_1 = require("zod");
var index_1 = require("./index");
var thought_logger_1 = require("../logging/thought-logger");
var apiKeysSchema = zod_1.z.object({
    xai: zod_1.z.string().min(1, "X.AI API key is required"),
    groq: zod_1.z.string().min(1, "Groq API key is required"),
    perplexity: zod_1.z.string().min(1, "Perplexity API key is required"),
    huggingface: zod_1.z.string().min(1, "Hugging Face token is required"),
    github: zod_1.z.string().min(1, "GitHub token is required"),
    pinecone: zod_1.z.string().min(1, "Pinecone API key is required")
});
function validateApiKeys() {
    thought_logger_1.thoughtLogger.log('execution', 'Validating API keys');
    var result = apiKeysSchema.safeParse(index_1.config.apiKeys);
    if (!result.success) {
        var missingKeys = result.error.issues
            .filter(function (issue) { return issue.code === 'too_small'; })
            .map(function (issue) { return issue.path[0]; });
        thought_logger_1.thoughtLogger.log('warning', 'Missing API keys detected', { missingKeys: missingKeys });
        return {
            valid: false,
            missingKeys: missingKeys,
            apiKeys: Object.fromEntries(Object.entries(index_1.config.apiKeys).map(function (_a) {
                var key = _a[0], value = _a[1];
                return [key, Boolean(value)];
            }))
        };
    }
    thought_logger_1.thoughtLogger.log('success', 'All API keys validated successfully');
    return {
        valid: true,
        missingKeys: [],
        apiKeys: Object.fromEntries(Object.entries(index_1.config.apiKeys).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [key, Boolean(value)];
        }))
    };
}
function getApiKeyStatus() {
    return Object.fromEntries(Object.entries(index_1.config.apiKeys).map(function (_a) {
        var key = _a[0], value = _a[1];
        return [key, Boolean(value)];
    }));
}
