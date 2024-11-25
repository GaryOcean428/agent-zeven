"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigValidator = void 0;
var thought_logger_1 = require("../../logging/thought-logger");
var ConfigValidator = /** @class */ (function () {
    function ConfigValidator() {
    }
    ConfigValidator.validateApiKey = function (apiKey) {
        if (!apiKey) {
            thought_logger_1.thoughtLogger.log('error', 'X.AI API key not found in environment variables');
            throw new Error('X.AI API key not configured. Please set VITE_XAI_API_KEY in your environment.');
        }
        var trimmedKey = apiKey.trim();
        if (trimmedKey.length < 32) {
            thought_logger_1.thoughtLogger.log('error', 'Invalid X.AI API key format');
            throw new Error('Invalid X.AI API key format. Please check your API key.');
        }
        return trimmedKey;
    };
    ConfigValidator.validateConfig = function (config) {
        var requiredFields = ['apiKey', 'baseUrl', 'apiVersion', 'defaultModel'];
        var missingFields = requiredFields.filter(function (field) { return !config[field]; });
        if (missingFields.length > 0) {
            thought_logger_1.thoughtLogger.log('error', 'Missing required configuration fields', { missingFields: missingFields });
            throw new Error("Missing required configuration fields: ".concat(missingFields.join(', ')));
        }
        // Validate rate limits
        if (config.rateLimits) {
            if (config.rateLimits.requestsPerMinute <= 0) {
                throw new Error('Invalid requests per minute limit');
            }
            if (config.rateLimits.tokensPerMinute <= 0) {
                throw new Error('Invalid tokens per minute limit');
            }
        }
        // Validate model configuration
        if (config.models && (!config.models.beta || !config.models.pro)) {
            throw new Error('Invalid model configuration');
        }
    };
    return ConfigValidator;
}());
exports.ConfigValidator = ConfigValidator;
