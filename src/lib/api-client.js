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
exports.APIClient = void 0;
var http_1 = require("./http");
var rate_limiter_1 = require("./rate-limiter");
var config_1 = require("./config");
var AppError_1 = require("./errors/AppError");
var thought_logger_1 = require("./logging/thought-logger");
var router_1 = require("./routing/router");
var APIClient = /** @class */ (function () {
    function APIClient() {
        this.httpClient = new http_1.HTTPClient('', {
            timeout: 30000,
            retries: 3,
            retryDelay: 1000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.rateLimiter = new rate_limiter_1.RateLimiter({
            maxRequests: 50,
            interval: 60 * 1000 // 1 minute
        });
        this.router = new router_1.ModelRouter();
    }
    APIClient.prototype.chat = function (messages, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var routerConfig, apiConfig, response, data, error_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.rateLimiter.acquire()];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 6, , 7]);
                        return [4 /*yield*/, this.router.route(messages[0].content, messages)];
                    case 3:
                        routerConfig = _c.sent();
                        thought_logger_1.thoughtLogger.log('decision', "Selected model: ".concat(routerConfig.model), {
                            confidence: routerConfig.confidence
                        });
                        apiConfig = this.getAPIConfig(routerConfig.model);
                        // Validate API key
                        if (!apiConfig.apiKey) {
                            throw new AppError_1.AppError("API key not configured for model ".concat(routerConfig.model), 'API_ERROR');
                        }
                        return [4 /*yield*/, this.httpClient.fetch(apiConfig.endpoint, {
                                method: 'POST',
                                headers: {
                                    'Authorization': "Bearer ".concat(apiConfig.apiKey),
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    messages: messages.map(function (_a) {
                                        var role = _a.role, content = _a.content;
                                        return ({ role: role, content: content });
                                    }),
                                    model: routerConfig.model,
                                    temperature: routerConfig.temperature,
                                    max_tokens: routerConfig.maxTokens,
                                    stream: Boolean(onProgress)
                                })
                            })];
                    case 4:
                        response = _c.sent();
                        if (onProgress && response.body) {
                            return [2 /*return*/, this.handleStreamingResponse(response.body, onProgress, routerConfig.model)];
                        }
                        return [4 /*yield*/, response.json()];
                    case 5:
                        data = _c.sent();
                        return [2 /*return*/, {
                                id: crypto.randomUUID(),
                                role: 'assistant',
                                content: ((_b = (_a = data.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || '',
                                timestamp: Date.now(),
                                model: routerConfig.model
                            }];
                    case 6:
                        error_1 = _c.sent();
                        thought_logger_1.thoughtLogger.log('error', 'API request failed', { error: error_1 });
                        if (error_1 instanceof AppError_1.AppError) {
                            throw error_1;
                        }
                        throw new AppError_1.AppError('Failed to communicate with API', 'API_ERROR', { originalError: error_1 });
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    APIClient.prototype.handleStreamingResponse = function (body, onProgress, model) {
        return __awaiter(this, void 0, void 0, function () {
            var reader, decoder, fullContent, _a, done, value, chunk, lines, _i, lines_1, line, data, parsed, content;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        reader = body.getReader();
                        decoder = new TextDecoder();
                        fullContent = '';
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, , 5, 6]);
                        _e.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 4];
                        return [4 /*yield*/, reader.read()];
                    case 3:
                        _a = _e.sent(), done = _a.done, value = _a.value;
                        if (done)
                            return [3 /*break*/, 4];
                        chunk = decoder.decode(value, { stream: true });
                        lines = chunk.split('\n');
                        for (_i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                            line = lines_1[_i];
                            if (line.startsWith('data: ')) {
                                data = line.slice(6);
                                if (data === '[DONE]')
                                    continue;
                                try {
                                    parsed = JSON.parse(data);
                                    content = (_d = (_c = (_b = parsed.choices) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.delta) === null || _d === void 0 ? void 0 : _d.content;
                                    if (content) {
                                        fullContent += content;
                                        onProgress(content);
                                    }
                                }
                                catch (e) {
                                    thought_logger_1.thoughtLogger.log('error', 'Failed to parse streaming response', { error: e });
                                }
                            }
                        }
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, {
                            id: crypto.randomUUID(),
                            role: 'assistant',
                            content: fullContent,
                            timestamp: Date.now(),
                            model: model
                        }];
                    case 5:
                        reader.releaseLock();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    APIClient.prototype.getAPIConfig = function (model) {
        if (model.startsWith('llama')) {
            return {
                endpoint: 'https://api.groq.com/openai/v1/chat/completions',
                apiKey: config_1.config.apiKeys.groq
            };
        }
        if (model === 'grok-beta') {
            return {
                endpoint: 'https://api.x.ai/v1/chat/completions',
                apiKey: config_1.config.apiKeys.xai
            };
        }
        if (model.includes('sonar')) {
            return {
                endpoint: 'https://api.perplexity.ai/chat/completions',
                apiKey: config_1.config.apiKeys.perplexity
            };
        }
        if (model.includes('granite')) {
            return {
                endpoint: "https://api-inference.huggingface.co/models/".concat(model),
                apiKey: config_1.config.apiKeys.huggingface
            };
        }
        throw new AppError_1.AppError("Unsupported model: ".concat(model), 'API_ERROR');
    };
    return APIClient;
}());
exports.APIClient = APIClient;
