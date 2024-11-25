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
var config_1 = require("../config");
var thought_logger_1 = require("../logging/thought-logger");
var AppError_1 = require("../errors/AppError");
var rate_limiter_1 = require("./rate-limiter");
var APIClient = /** @class */ (function () {
    function APIClient() {
        this.initialized = false;
        this.rateLimiter = new rate_limiter_1.RateLimiter({
            maxRequests: 60,
            interval: 60 * 1000 // 1 minute
        });
    }
    APIClient.getInstance = function () {
        if (!APIClient.instance) {
            APIClient.instance = new APIClient();
        }
        return APIClient.instance;
    };
    APIClient.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var missingKeys, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.initialized)
                            return [2 /*return*/, this];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        missingKeys = this.validateApiKeys();
                        if (missingKeys.length > 0) {
                            throw new AppError_1.AppError("Missing API keys: ".concat(missingKeys.join(', ')), 'CONFIG_ERROR');
                        }
                        // Test API connection
                        return [4 /*yield*/, this.testConnection()];
                    case 2:
                        // Test API connection
                        _a.sent();
                        this.initialized = true;
                        thought_logger_1.thoughtLogger.log('success', 'API client initialized successfully');
                        return [2 /*return*/, this];
                    case 3:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to initialize API client', { error: error_1 });
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    APIClient.prototype.validateApiKeys = function () {
        var requiredKeys = ['xai', 'groq', 'perplexity', 'huggingface'];
        return requiredKeys.filter(function (key) { return !config_1.config.apiKeys[key]; });
    };
    APIClient.prototype.testConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(config_1.config.services.xai.baseUrl, "/models"), {
                            headers: {
                                'Authorization': "Bearer ".concat(config_1.config.apiKeys.xai),
                                'Content-Type': 'application/json'
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new AppError_1.AppError('Failed to connect to API', 'API_ERROR');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    APIClient.prototype.chat = function (messages, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error, data, error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: 
                    // Check rate limits
                    return [4 /*yield*/, this.rateLimiter.acquire()];
                    case 3:
                        // Check rate limits
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 11, , 12]);
                        return [4 /*yield*/, fetch("".concat(config_1.config.services.xai.baseUrl, "/chat/completions"), {
                                method: 'POST',
                                headers: {
                                    'Authorization': "Bearer ".concat(config_1.config.apiKeys.xai),
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    messages: messages.map(function (_a) {
                                        var role = _a.role, content = _a.content;
                                        return ({ role: role, content: content });
                                    }),
                                    model: config_1.config.services.xai.defaultModel,
                                    stream: Boolean(onProgress),
                                    temperature: config_1.config.services.xai.temperature,
                                    max_tokens: config_1.config.services.xai.maxTokens
                                })
                            })];
                    case 5:
                        response = _b.sent();
                        if (!!response.ok) return [3 /*break*/, 7];
                        return [4 /*yield*/, response.json().catch(function () { return ({}); })];
                    case 6:
                        error = _b.sent();
                        throw new AppError_1.AppError("Chat API request failed: ".concat(((_a = error.error) === null || _a === void 0 ? void 0 : _a.message) || response.statusText), 'API_ERROR');
                    case 7:
                        if (!(onProgress && response.body)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.handleStreamingResponse(response.body, onProgress)];
                    case 8:
                        _b.sent();
                        return [2 /*return*/];
                    case 9: return [4 /*yield*/, response.json()];
                    case 10:
                        data = _b.sent();
                        onProgress === null || onProgress === void 0 ? void 0 : onProgress(data.choices[0].message.content);
                        return [3 /*break*/, 12];
                    case 11:
                        error_2 = _b.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Chat request failed', { error: error_2 });
                        throw error_2;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    APIClient.prototype.handleStreamingResponse = function (body, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var reader, decoder, _a, done, value, chunk, lines, _i, lines_1, line, data, parsed, content;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        reader = body.getReader();
                        decoder = new TextDecoder();
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
                                        onProgress(content);
                                    }
                                }
                                catch (e) {
                                    thought_logger_1.thoughtLogger.log('error', 'Failed to parse streaming response', { error: e });
                                }
                            }
                        }
                        return [3 /*break*/, 2];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        reader.releaseLock();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(APIClient.prototype, "isInitialized", {
        get: function () {
            return this.initialized;
        },
        enumerable: false,
        configurable: true
    });
    APIClient.instance = null;
    return APIClient;
}());
exports.APIClient = APIClient;
