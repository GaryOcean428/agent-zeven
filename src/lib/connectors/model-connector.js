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
exports.ModelConnector = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var config_1 = require("../config");
var ModelConnector = /** @class */ (function () {
    function ModelConnector() {
        this.modelEndpoints = new Map([
            ['grok-beta', 'https://api.x.ai/v1/chat/completions'],
            ['llama-3.2-70b-preview', 'https://api.groq.com/openai/v1/chat/completions'],
            ['llama-3.2-7b-preview', 'https://api.groq.com/openai/v1/chat/completions'],
            ['llama-3.2-3b-preview', 'https://api.groq.com/openai/v1/chat/completions'],
            ['ibm-granite/granite-3b-code-base-2k', 'https://api-inference.huggingface.co/models/ibm-granite/granite-3b-code-base-2k']
        ]);
    }
    ModelConnector.getInstance = function () {
        if (!ModelConnector.instance) {
            ModelConnector.instance = new ModelConnector();
        }
        return ModelConnector.instance;
    };
    ModelConnector.prototype.routeToModel = function (messages, routerConfig, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = this.modelEndpoints.get(routerConfig.model);
                        if (!endpoint) {
                            throw new Error("No endpoint found for model ".concat(routerConfig.model));
                        }
                        thought_logger_1.thoughtLogger.log('plan', "Routing request to ".concat(routerConfig.model), {
                            modelUsed: routerConfig.model,
                            confidence: routerConfig.confidence
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (routerConfig.model.includes('granite')) {
                            return [2 /*return*/, this.callHuggingFace(messages, routerConfig)];
                        }
                        return [4 /*yield*/, fetch(endpoint, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': "Bearer ".concat(this.getApiKey(routerConfig.model))
                                },
                                body: JSON.stringify({
                                    messages: messages,
                                    model: routerConfig.model,
                                    temperature: routerConfig.temperature,
                                    max_tokens: routerConfig.maxTokens,
                                    stream: Boolean(onProgress)
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Model API request failed: ".concat(response.statusText));
                        }
                        if (onProgress && response.body) {
                            return [2 /*return*/, this.handleStreamingResponse(response.body, routerConfig, onProgress)];
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, {
                                content: data.choices[0].message.content,
                                model: routerConfig.model,
                                confidence: routerConfig.confidence
                            }];
                    case 4:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('critique', "Model request failed: ".concat(error_1 instanceof Error ? error_1.message : 'Unknown error'));
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ModelConnector.prototype.callHuggingFace = function (messages, routerConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var combinedMessage, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        combinedMessage = messages.map(function (m) { return "".concat(m.role, ": ").concat(m.content); }).join('\n');
                        return [4 /*yield*/, fetch(this.modelEndpoints.get(routerConfig.model), {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': "Bearer ".concat(config_1.config.apiKeys.huggingface)
                                },
                                body: JSON.stringify({
                                    inputs: combinedMessage,
                                    parameters: {
                                        max_new_tokens: routerConfig.maxTokens,
                                        temperature: routerConfig.temperature,
                                        return_full_text: false
                                    }
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, {
                                content: data[0].generated_text,
                                model: routerConfig.model,
                                confidence: routerConfig.confidence
                            }];
                }
            });
        });
    };
    ModelConnector.prototype.handleStreamingResponse = function (body, routerConfig, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var reader, decoder, fullContent, _a, done, value, chunk, lines, _i, lines_1, line, data, parsed, content;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        reader = body.getReader();
                        decoder = new TextDecoder();
                        fullContent = '';
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, , 5, 6]);
                        _d.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 4];
                        return [4 /*yield*/, reader.read()];
                    case 3:
                        _a = _d.sent(), done = _a.done, value = _a.value;
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
                                    content = (_c = (_b = parsed.choices[0]) === null || _b === void 0 ? void 0 : _b.delta) === null || _c === void 0 ? void 0 : _c.content;
                                    if (content) {
                                        fullContent += content;
                                        onProgress(content);
                                    }
                                }
                                catch (e) {
                                    console.error('Failed to parse streaming response:', e);
                                }
                            }
                        }
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, {
                            content: fullContent,
                            model: routerConfig.model,
                            confidence: routerConfig.confidence
                        }];
                    case 5:
                        reader.releaseLock();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ModelConnector.prototype.getApiKey = function (model) {
        if (model === 'grok-beta') {
            return config_1.config.apiKeys.xai;
        }
        if (model.includes('llama')) {
            return config_1.config.apiKeys.groq;
        }
        if (model.includes('granite')) {
            return config_1.config.apiKeys.huggingface;
        }
        throw new Error("No API key found for model ".concat(model));
    };
    return ModelConnector;
}());
exports.ModelConnector = ModelConnector;
