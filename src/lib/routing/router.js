"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRouter = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var config_1 = require("../config");
var ModelRouter = /** @class */ (function () {
    function ModelRouter() {
        this.initialized = false;
    }
    ModelRouter.getInstance = function () {
        if (!ModelRouter.instance) {
            ModelRouter.instance = new ModelRouter();
        }
        return ModelRouter.instance;
    };
    ModelRouter.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.initialized)
                    return [2 /*return*/];
                try {
                    // Validate model configurations
                    this.validateModelConfigs();
                    this.initialized = true;
                    thought_logger_1.thoughtLogger.log('success', 'Model router initialized');
                }
                catch (error) {
                    thought_logger_1.thoughtLogger.log('error', 'Failed to initialize model router', { error: error });
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    ModelRouter.prototype.validateModelConfigs = function () {
        var requiredModels = [
            config_1.config.services.xai.defaultModel,
            config_1.config.services.groq.models.large,
            config_1.config.services.perplexity.defaultModel
        ];
        var missingModels = requiredModels.filter(function (model) { return !model; });
        if (missingModels.length > 0) {
            throw new Error("Missing required model configurations: ".concat(missingModels.join(', ')));
        }
    };
    ModelRouter.prototype.route = function (query, history) {
        return __awaiter(this, void 0, void 0, function () {
            var complexity, contextLength, requiresCode, requiresSearch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        thought_logger_1.thoughtLogger.log('reasoning', 'Analyzing query for model selection');
                        complexity = this.assessComplexity(query);
                        contextLength = this.calculateContextLength(history);
                        requiresCode = this.requiresCodeExecution(query);
                        requiresSearch = this.requiresSearch(query);
                        thought_logger_1.thoughtLogger.log('observation', 'Query analysis complete', {
                            complexity: complexity,
                            contextLength: contextLength,
                            requiresCode: requiresCode,
                            requiresSearch: requiresSearch
                        });
                        // Route based on requirements
                        if (requiresCode) {
                            return [2 /*return*/, {
                                    model: config_1.config.services.groq.models.medium,
                                    maxTokens: 4096,
                                    temperature: 0.7,
                                    confidence: 0.9
                                }];
                        }
                        if (requiresSearch) {
                            return [2 /*return*/, {
                                    model: config_1.config.services.perplexity.defaultModel,
                                    maxTokens: config_1.config.services.perplexity.maxTokens,
                                    temperature: config_1.config.services.perplexity.temperature,
                                    confidence: 0.9
                                }];
                        }
                        if (complexity > 0.8 || contextLength > 8000) {
                            return [2 /*return*/, {
                                    model: config_1.config.services.xai.defaultModel,
                                    maxTokens: config_1.config.services.xai.maxTokens,
                                    temperature: config_1.config.services.xai.temperature,
                                    confidence: 0.95
                                }];
                        }
                        return [2 /*return*/, {
                                model: config_1.config.services.groq.models.large,
                                maxTokens: config_1.config.services.groq.maxTokens,
                                temperature: config_1.config.services.groq.temperature,
                                confidence: 0.85
                            }];
                }
            });
        });
    };
    ModelRouter.prototype.assessComplexity = function (query) {
        var factors = {
            length: Math.min(query.length / 500, 1),
            questionWords: (query.match(/\b(how|why|what|when|where|who)\b/gi) || []).length * 0.1,
            technicalTerms: (query.match(/\b(algorithm|function|process|system|analyze)\b/gi) || []).length * 0.15,
            codeRelated: /\b(code|program|debug|function|api)\b/i.test(query) ? 0.3 : 0,
            multipleSteps: (query.match(/\b(and|then|after|before|finally)\b/gi) || []).length * 0.1
        };
        return Math.min(Object.values(factors).reduce(function (sum, value) { return sum + value; }, 0), 1);
    };
    ModelRouter.prototype.calculateContextLength = function (history) {
        return history.reduce(function (sum, msg) { return sum + msg.content.length; }, 0);
    };
    ModelRouter.prototype.requiresCodeExecution = function (query) {
        return /\b(code|function|program|algorithm|implement|debug|compile|execute)\b/i.test(query);
    };
    ModelRouter.prototype.requiresSearch = function (query) {
        return /\b(search|find|look up|latest|current|news|information about|tell me about)\b/i.test(query);
    };
    Object.defineProperty(ModelRouter.prototype, "isInitialized", {
        get: function () {
            return this.initialized;
        },
        enumerable: false,
        configurable: true
    });
    return ModelRouter;
}());
exports.ModelRouter = ModelRouter;
