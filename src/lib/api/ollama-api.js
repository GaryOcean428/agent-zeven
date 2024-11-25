"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.OllamaAPI = void 0;
var base_api_1 = require("./base-api");
var AppError_1 = require("../errors/AppError");
var thought_logger_1 = require("../logging/thought-logger");
var OllamaAPI = /** @class */ (function (_super) {
    __extends(OllamaAPI, _super);
    function OllamaAPI() {
        var _this = _super.call(this) || this;
        _this.isInitialized = false;
        _this.connectionError = null;
        _this.retryTimeout = null;
        _this.retryCount = 0;
        _this.maxRetries = 3;
        _this.checkConnection();
        return _this;
    }
    OllamaAPI.getInstance = function () {
        if (!OllamaAPI.instance) {
            OllamaAPI.instance = new OllamaAPI();
        }
        return OllamaAPI.instance;
    };
    OllamaAPI.prototype.checkConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, hasModel, error_1;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        thought_logger_1.thoughtLogger.log('execution', 'Checking Ollama connection');
                        return [4 /*yield*/, fetch("".concat(this.config.services.ollama.baseUrl, "/api/tags"), {
                                signal: AbortSignal.timeout(5000), // 5 second timeout
                                headers: {
                                    'Access-Control-Allow-Origin': '*'
                                }
                            })];
                    case 1:
                        response = _b.sent();
                        if (!response.ok) {
                            throw new Error('Ollama server responded with an error');
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        hasModel = (_a = data.models) === null || _a === void 0 ? void 0 : _a.some(function (model) {
                            return model.name === _this.config.services.ollama.models.granite;
                        });
                        if (!hasModel) {
                            this.handleConnectionError('Granite model not found. Please ensure the model is available.');
                            return [2 /*return*/];
                        }
                        this.isInitialized = true;
                        this.connectionError = null;
                        this.retryCount = 0;
                        thought_logger_1.thoughtLogger.log('success', 'Connected to Ollama server');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        if (this.retryCount < this.maxRetries) {
                            this.retryCount++;
                            this.handleConnectionError("Attempting to connect to Ollama server... (Attempt ".concat(this.retryCount, "/").concat(this.maxRetries, ")"));
                        }
                        else {
                            this.handleConnectionError('Failed to connect to Ollama server. Please check the connection.');
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OllamaAPI.prototype.handleConnectionError = function (message) {
        var _this = this;
        this.isInitialized = false;
        this.connectionError = message;
        thought_logger_1.thoughtLogger.log('warning', message);
        // Retry connection every 30 seconds
        if (!this.retryTimeout) {
            this.retryTimeout = window.setTimeout(function () {
                _this.retryTimeout = null;
                _this.checkConnection();
            }, 30000);
        }
    };
    OllamaAPI.prototype.chat = function (messages, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isInitialized) {
                            if (this.connectionError) {
                                throw new AppError_1.AppError(this.connectionError, 'OLLAMA_ERROR');
                            }
                            throw new AppError_1.AppError('Ollama not initialized', 'OLLAMA_ERROR');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("".concat(this.config.services.ollama.baseUrl, "/api/chat"), {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*'
                                },
                                body: JSON.stringify({
                                    model: this.config.services.ollama.models.granite,
                                    messages: messages.map(function (_a) {
                                        var role = _a.role, content = _a.content;
                                        return ({ role: role, content: content });
                                    }),
                                    stream: Boolean(onProgress),
                                    options: {
                                        temperature: this.config.services.ollama.temperature,
                                        num_predict: this.config.services.ollama.maxTokens
                                    }
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new AppError_1.AppError("Ollama API error: ".concat(response.statusText), 'API_ERROR', { status: response.status });
                        }
                        if (onProgress && response.body) {
                            return [2 /*return*/, this.handleStreamingResponse(response.body, onProgress)];
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, data.message.content];
                    case 4:
                        error_2 = _a.sent();
                        // If connection fails, mark as uninitialized and retry connection
                        if (error_2 instanceof TypeError && error_2.message.includes('Failed to fetch')) {
                            this.isInitialized = false;
                            this.checkConnection();
                        }
                        thought_logger_1.thoughtLogger.log('error', 'Ollama API request failed', { error: error_2 });
                        throw error_2 instanceof AppError_1.AppError ? error_2 : new AppError_1.AppError('Failed to communicate with Ollama API', 'API_ERROR', { originalError: error_2 });
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OllamaAPI.prototype.handleStreamingResponse = function (body, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var reader, decoder, fullContent, _a, done, value, chunk, lines, _i, lines_1, line, parsed;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        reader = body.getReader();
                        decoder = new TextDecoder();
                        fullContent = '';
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, , 5, 6]);
                        _c.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 4];
                        return [4 /*yield*/, reader.read()];
                    case 3:
                        _a = _c.sent(), done = _a.done, value = _a.value;
                        if (done)
                            return [3 /*break*/, 4];
                        chunk = decoder.decode(value, { stream: true });
                        lines = chunk.split('\n');
                        for (_i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                            line = lines_1[_i];
                            if (!line)
                                continue;
                            try {
                                parsed = JSON.parse(line);
                                if ((_b = parsed.message) === null || _b === void 0 ? void 0 : _b.content) {
                                    fullContent += parsed.message.content;
                                    onProgress(parsed.message.content);
                                }
                            }
                            catch (e) {
                                thought_logger_1.thoughtLogger.log('error', 'Failed to parse streaming response', { error: e });
                            }
                        }
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, fullContent];
                    case 5:
                        reader.releaseLock();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OllamaAPI.prototype.isAvailable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connectionError) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.checkConnection()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.isInitialized];
                }
            });
        });
    };
    OllamaAPI.prototype.getConnectionError = function () {
        return this.connectionError;
    };
    OllamaAPI.prototype.cleanup = function () {
        if (this.retryTimeout) {
            clearTimeout(this.retryTimeout);
            this.retryTimeout = null;
        }
    };
    return OllamaAPI;
}(base_api_1.BaseAPI));
exports.OllamaAPI = OllamaAPI;
