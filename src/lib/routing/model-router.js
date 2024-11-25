"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var models_1 = require("../config/models");
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
            models_1.models.xai.grokBeta.id,
            models_1.models.groq.advanced.id,
            models_1.models.perplexity.large.id,
            models_1.models.granite.codeBase.id
        ];
        var missingModels = requiredModels.filter(function (model) { return !model; });
        if (missingModels.length > 0) {
            throw new Error("Missing required model configurations: ".concat(missingModels.join(', ')));
        }
    };
    ModelRouter.prototype.route = function (query, history) {
        return __awaiter(this, void 0, void 0, function () {
            var complexity, selectedModel, capabilities, modelConfig;
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
                        selectedModel = (0, models_1.selectModel)(query, complexity);
                        capabilities = (0, models_1.getModelCapabilities)(selectedModel);
                        thought_logger_1.thoughtLogger.log('decision', "Selected model: ".concat(selectedModel), {
                            complexity: complexity,
                            capabilities: capabilities
                        });
                        modelConfig = Object.values(__assign(__assign(__assign(__assign({}, models_1.models.groq), models_1.models.perplexity), models_1.models.xai), models_1.models.granite)).find(function (m) { return m.id === selectedModel; });
                        if (!modelConfig) {
                            throw new Error("Model configuration not found for ".concat(selectedModel));
                        }
                        return [2 /*return*/, {
                                model: modelConfig.id,
                                maxTokens: modelConfig.maxTokens,
                                temperature: modelConfig.temperature,
                                confidence: this.calculateConfidence(complexity, capabilities),
                                responseStrategy: this.determineResponseStrategy(query, complexity)
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
    ModelRouter.prototype.calculateConfidence = function (complexity, capabilities) {
        // Base confidence on complexity and capability match
        var baseConfidence = 0.7;
        var complexityFactor = 1 - (complexity * 0.3); // Lower confidence for higher complexity
        var capabilityBonus = capabilities.length * 0.05; // Bonus for each relevant capability
        return Math.min(baseConfidence + capabilityBonus * complexityFactor, 1);
    };
    ModelRouter.prototype.determineResponseStrategy = function (query, complexity) {
        // Use streaming for complex or long-form responses
        if (complexity > 0.7 || query.length > 200) {
            return 'stream';
        }
        return 'complete';
    };
    return ModelRouter;
}());
exports.ModelRouter = ModelRouter;
