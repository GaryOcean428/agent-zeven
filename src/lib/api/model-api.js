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
exports.ModelAPI = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var config_1 = require("../config");
var AppError_1 = require("../errors/AppError");
var ModelAPI = /** @class */ (function () {
    function ModelAPI() {
    }
    ModelAPI.getInstance = function () {
        if (!ModelAPI.instance) {
            ModelAPI.instance = new ModelAPI();
        }
        return ModelAPI.instance;
    };
    ModelAPI.prototype.callModel = function (messages, model, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, endpoint, headers, response, errorData, data, error_1;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('execution', "Calling model: ".concat(model));
                        // Validate API keys
                        if (model.startsWith('llama') && !config_1.config.apiKeys.groq) {
                            throw new AppError_1.APIError('Groq API key not configured', 401);
                        }
                        if (model === 'grok-beta' && !config_1.config.apiKeys.xai) {
                            throw new AppError_1.APIError('X.AI API key not configured', 401);
                        }
                        if (model.includes('sonar') && !config_1.config.apiKeys.perplexity) {
                            throw new AppError_1.APIError('Perplexity API key not configured', 401);
                        }
                        _a = this.getEndpointConfig(model), endpoint = _a.endpoint, headers = _a.headers;
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, fetch(endpoint, {
                                method: 'POST',
                                headers: headers,
                                body: JSON.stringify({
                                    messages: messages,
                                    model: model,
                                    temperature: 0.7,
                                    max_tokens: 4096,
                                    stream: Boolean(onProgress)
                                })
                            })];
                    case 2:
                        response = _f.sent();
                        if (!!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.json().catch(function () { return ({}); })];
                    case 3:
                        errorData = _f.sent();
                        throw new AppError_1.APIError("Model API error: ".concat(((_b = errorData.error) === null || _b === void 0 ? void 0 : _b.message) || response.statusText), response.status, errorData);
                    case 4:
                        if (onProgress && response.body) {
                            return [2 /*return*/, this.handleStreamingResponse(response.body, model, onProgress)];
                        }
                        return [4 /*yield*/, response.json()];
                    case 5:
                        data = _f.sent();
                        if (!((_e = (_d = (_c = data.choices) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.message) === null || _e === void 0 ? void 0 : _e.content)) {
                            throw new AppError_1.APIError('Invalid response format from API', response.status, data);
                        }
                        return [2 /*return*/, {
                                content: data.choices[0].message.content,
                                model: model,
                                confidence: 0.9
                            }];
                    case 6:
                        error_1 = _f.sent();
                        if (error_1 instanceof AppError_1.APIError) {
                            thought_logger_1.thoughtLogger.log('error', "API Error: ".concat(error_1.message), {
                                status: error_1.status,
                                details: error_1.details
                            });
                            throw error_1;
                        }
                        thought_logger_1.thoughtLogger.log('error', "Unexpected error: ".concat(error_1));
                        throw new AppError_1.APIError('Failed to communicate with model API', 500, { originalError: error_1 });
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ModelAPI.prototype.getEndpointConfig = function (model) {
        if (model.startsWith('llama')) {
            return {
                endpoint: 'https://api.groq.com/openai/v1/chat/completions',
                headers: {
                    'Authorization': "Bearer ".concat(config_1.config.apiKeys.groq),
                    'Content-Type': 'application/json'
                }
            };
        }
        if (model === 'grok-beta') {
            return {
                endpoint: 'https://api.x.ai/v1/chat/completions',
                headers: {
                    'Authorization': "Bearer ".concat(config_1.config.apiKeys.xai),
                    'Content-Type': 'application/json'
                }
            };
        }
        if (model.includes('sonar')) {
            return {
                endpoint: 'https://api.perplexity.ai/chat/completions',
                headers: {
                    'Authorization': "Bearer ".concat(config_1.config.apiKeys.perplexity),
                    'Content-Type': 'application/json'
                }
            };
        }
        throw new AppError_1.APIError("Unsupported model: ".concat(model), 400);
    };
    ModelAPI.prototype.handleStreamingResponse = function (body, model, onProgress) {
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
                                    thought_logger_1.thoughtLogger.log('error', 'Failed to parse streaming response', e);
                                }
                            }
                        }
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, {
                            content: fullContent,
                            model: model,
                            confidence: 0.9
                        }];
                    case 5:
                        reader.releaseLock();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return ModelAPI;
}());
exports.ModelAPI = ModelAPI;
