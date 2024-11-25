"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
exports.selectModel = selectModel;
exports.getModelCapabilities = getModelCapabilities;
exports.models = {
    // Groq Models
    groq: {
        simple: {
            id: 'llama-3.2-3b-preview',
            description: 'Simple tasks and quick responses',
            maxTokens: 2048,
            temperature: 0.7,
            capabilities: ['basic-chat', 'simple-tasks']
        },
        balanced: {
            id: 'llama-3.2-7b-preview',
            description: 'Balanced performance for general tasks',
            maxTokens: 4096,
            temperature: 0.7,
            capabilities: ['general-chat', 'code-generation', 'analysis']
        },
        advanced: {
            id: 'llama-3.2-70b-preview',
            description: 'Complex tasks and advanced reasoning',
            maxTokens: 8192,
            temperature: 0.7,
            capabilities: ['complex-reasoning', 'expert-analysis', 'advanced-code']
        }
    },
    // Perplexity Models
    perplexity: {
        small: {
            id: 'llama-3.1-sonar-small-128k-online',
            description: '8B parameters, efficient for simple searches',
            maxTokens: 2048,
            temperature: 0.7,
            capabilities: ['web-search', 'information-retrieval']
        },
        large: {
            id: 'llama-3.1-sonar-large-128k-online',
            description: '70B parameters, comprehensive search',
            maxTokens: 4096,
            temperature: 0.7,
            capabilities: ['advanced-search', 'data-synthesis', 'current-events']
        }
    },
    // X.AI Models
    xai: {
        grokBeta: {
            id: 'grok-beta',
            description: 'Expert-level queries and complex reasoning',
            maxTokens: 4096,
            temperature: 0.7,
            capabilities: ['expert-queries', 'complex-reasoning', 'advanced-analysis']
        }
    }
};
function selectModel(task, complexity) {
    if (complexity === void 0) { complexity = 0.5; }
    // Code-related tasks
    if (task.toLowerCase().includes('code') || task.toLowerCase().includes('program')) {
        return complexity > 0.5 ? exports.models.groq.advanced.id : exports.models.groq.balanced.id;
    }
    // Search and information tasks
    if (task.toLowerCase().includes('search') || task.toLowerCase().includes('find')) {
        if (complexity > 0.8)
            return exports.models.perplexity.large.id;
        return exports.models.perplexity.small.id;
    }
    // Expert-level queries
    if (complexity > 0.8) {
        return exports.models.xai.grokBeta.id;
    }
    // General tasks based on complexity
    if (complexity > 0.7)
        return exports.models.groq.advanced.id;
    if (complexity > 0.4)
        return exports.models.groq.balanced.id;
    return exports.models.groq.simple.id;
}
function getModelCapabilities(modelId) {
    var allModels = __spreadArray(__spreadArray(__spreadArray([], Object.values(exports.models.groq), true), Object.values(exports.models.perplexity), true), Object.values(exports.models.xai), true);
    var model = allModels.find(function (m) { return m.id === modelId; });
    return (model === null || model === void 0 ? void 0 : model.capabilities) || [];
}
