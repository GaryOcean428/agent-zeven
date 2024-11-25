"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextEnhancer = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var ContextEnhancer = /** @class */ (function () {
    function ContextEnhancer() {
        this.rules = [];
        this.initializeRules();
    }
    ContextEnhancer.getInstance = function () {
        if (!ContextEnhancer.instance) {
            ContextEnhancer.instance = new ContextEnhancer();
        }
        return ContextEnhancer.instance;
    };
    ContextEnhancer.prototype.initializeRules = function () {
        this.rules = [
            // Code-related context
            {
                pattern: /```[\s\S]*?```/g,
                enhance: function (match, message) {
                    var code = match[0].replace(/```(\w+)?\n?/, '').replace(/```$/, '');
                    return "[Code Block] Language context: The user is working with code. Previous code snippet:\n".concat(code);
                }
            },
            // Technical terms
            {
                pattern: /\b(api|function|component|database|server|client|endpoint)\b/gi,
                enhance: function (match) { return "[Technical Context] The conversation involves technical concepts, specifically: ".concat(match[0]); }
            },
            // Questions and inquiries
            {
                pattern: /\b(how|what|why|when|where|who|can you|could you)\b.*\?/gi,
                enhance: function (match) { return "[Question Context] The user is asking for information about: ".concat(match[0]); }
            },
            // Action requests
            {
                pattern: /\b(create|make|build|implement|add|update|delete|remove)\b/gi,
                enhance: function (match) { return "[Action Context] The user wants to perform an action: ".concat(match[0]); }
            },
            // Error-related context
            {
                pattern: /\b(error|bug|issue|problem|fail|crash)\b/gi,
                enhance: function (match) { return "[Error Context] The user is experiencing issues: ".concat(match[0]); }
            }
        ];
    };
    ContextEnhancer.prototype.enhanceContext = function (message) {
        thought_logger_1.thoughtLogger.log('execution', 'Enhancing message context');
        try {
            var enhancedContext_1 = '';
            var content_1 = message.content;
            // Apply each rule and collect enhancements
            this.rules.forEach(function (rule) {
                var matches = content_1.match(rule.pattern);
                if (matches) {
                    matches.forEach(function (match) {
                        var enhancement = rule.enhance([match], message);
                        enhancedContext_1 += enhancement + '\n';
                    });
                }
            });
            // Add role-specific context
            enhancedContext_1 += this.getRoleContext(message);
            // Add temporal context
            enhancedContext_1 += this.getTemporalContext(message);
            thought_logger_1.thoughtLogger.log('success', 'Context enhanced successfully');
            return enhancedContext_1;
        }
        catch (error) {
            thought_logger_1.thoughtLogger.log('error', 'Failed to enhance context', { error: error });
            return '';
        }
    };
    ContextEnhancer.prototype.getRoleContext = function (message) {
        switch (message.role) {
            case 'user':
                return '[Role Context] This is a direct user query or request\n';
            case 'assistant':
                return '[Role Context] This is an AI assistant response\n';
            case 'system':
                return '[Role Context] This is a system message or instruction\n';
            default:
                return '';
        }
    };
    ContextEnhancer.prototype.getTemporalContext = function (message) {
        var now = Date.now();
        var messageAge = now - message.timestamp;
        if (messageAge < 60000) { // Less than 1 minute
            return '[Temporal Context] This is a very recent message\n';
        }
        else if (messageAge < 3600000) { // Less than 1 hour
            return '[Temporal Context] This message is from within the last hour\n';
        }
        else {
            return '[Temporal Context] This is an older message\n';
        }
    };
    ContextEnhancer.prototype.addRule = function (rule) {
        this.rules.push(rule);
    };
    ContextEnhancer.prototype.clearRules = function () {
        this.rules = [];
        this.initializeRules();
    };
    return ContextEnhancer;
}());
exports.ContextEnhancer = ContextEnhancer;
