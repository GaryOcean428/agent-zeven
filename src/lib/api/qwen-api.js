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
exports.QwenAPI = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var AppError_1 = require("../errors/AppError");
var config_1 = require("../config");
var QwenAPI = /** @class */ (function () {
    function QwenAPI() {
        this.initialized = false;
        this.model = 'Qwen/Qwen2.5-Coder-32B-Instruct';
    }
    QwenAPI.getInstance = function () {
        if (!QwenAPI.instance) {
            QwenAPI.instance = new QwenAPI();
        }
        return QwenAPI.instance;
    };
    QwenAPI.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.initialized)
                    return [2 /*return*/];
                try {
                    if (!config_1.config.apiKeys.huggingface) {
                        throw new AppError_1.AppError('Hugging Face API key not configured', 'CONFIG_ERROR');
                    }
                    this.initialized = true;
                    thought_logger_1.thoughtLogger.log('success', 'Qwen API initialized successfully');
                }
                catch (error) {
                    thought_logger_1.thoughtLogger.log('error', 'Failed to initialize Qwen API', { error: error });
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    QwenAPI.prototype.generateCode = function (prompt, language, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        thought_logger_1.thoughtLogger.log('execution', 'Generating code with Qwen', {
                            language: language,
                            promptLength: prompt.length
                        });
                        return [4 /*yield*/, fetch("https://api-inference.huggingface.co/models/".concat(this.model), {
                                method: 'POST',
                                headers: {
                                    'Authorization': "Bearer ".concat(config_1.config.apiKeys.huggingface),
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    inputs: this.formatPrompt(prompt, language),
                                    parameters: {
                                        max_new_tokens: 2048,
                                        temperature: 0.2,
                                        top_p: 0.95,
                                        stream: Boolean(onProgress)
                                    }
                                })
                            })];
                    case 3:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new AppError_1.AppError("Qwen API error: ".concat(response.statusText), 'API_ERROR', { status: response.status });
                        }
                        if (onProgress && response.body) {
                            return [2 /*return*/, this.handleStreamingResponse(response.body, onProgress)];
                        }
                        return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'Code generation complete');
                        return [2 /*return*/, data[0].generated_text];
                    case 5:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Code generation failed', { error: error_1 });
                        throw error_1 instanceof AppError_1.AppError ? error_1 : new AppError_1.AppError('Failed to generate code', 'GENERATION_ERROR', error_1);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    QwenAPI.prototype.reviewCode = function (code, language) {
        return __awaiter(this, void 0, void 0, function () {
            var prompt_1, response, data, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        thought_logger_1.thoughtLogger.log('execution', 'Reviewing code with Qwen', { language: language });
                        prompt_1 = "Review the following ".concat(language || '', " code and provide:\n1. List of potential issues\n2. Improvement suggestions\n3. Code quality score (0-100)\n\nCode to review:\n```\n").concat(code, "\n```");
                        return [4 /*yield*/, fetch("https://api-inference.huggingface.co/models/".concat(this.model), {
                                method: 'POST',
                                headers: {
                                    'Authorization': "Bearer ".concat(config_1.config.apiKeys.huggingface),
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    inputs: prompt_1,
                                    parameters: {
                                        max_new_tokens: 1024,
                                        temperature: 0.3
                                    }
                                })
                            })];
                    case 3:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new AppError_1.AppError("Qwen API error: ".concat(response.statusText), 'API_ERROR', { status: response.status });
                        }
                        return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        result = this.parseReviewResponse(data[0].generated_text);
                        thought_logger_1.thoughtLogger.log('success', 'Code review complete', {
                            issueCount: result.issues.length,
                            suggestionCount: result.suggestions.length,
                            quality: result.quality
                        });
                        return [2 /*return*/, result];
                    case 5:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Code review failed', { error: error_2 });
                        throw error_2 instanceof AppError_1.AppError ? error_2 : new AppError_1.AppError('Failed to review code', 'REVIEW_ERROR', error_2);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    QwenAPI.prototype.formatPrompt = function (prompt, language) {
        return "You are an expert programmer. Generate high-quality ".concat(language || '', " code based on the following request:\n\n").concat(prompt, "\n\nProvide clean, efficient, and well-documented code with proper error handling.");
    };
    QwenAPI.prototype.handleStreamingResponse = function (body, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var reader, decoder, fullContent, _a, done, value, chunk;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        reader = body.getReader();
                        decoder = new TextDecoder();
                        fullContent = '';
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 5, 6]);
                        _b.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 4];
                        return [4 /*yield*/, reader.read()];
                    case 3:
                        _a = _b.sent(), done = _a.done, value = _a.value;
                        if (done)
                            return [3 /*break*/, 4];
                        chunk = decoder.decode(value, { stream: true });
                        fullContent += chunk;
                        onProgress(chunk);
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
    QwenAPI.prototype.parseReviewResponse = function (response) {
        var _a;
        var issues = [];
        var suggestions = [];
        var quality = 0;
        var lines = response.split('\n');
        var currentSection = '';
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            if (line.includes('Issues:')) {
                currentSection = 'issues';
            }
            else if (line.includes('Suggestions:')) {
                currentSection = 'suggestions';
            }
            else if (line.includes('Quality Score:')) {
                quality = parseInt(((_a = line.match(/\d+/)) === null || _a === void 0 ? void 0 : _a[0]) || '0');
            }
            else if (line.trim().startsWith('-')) {
                var item = line.trim().slice(2);
                if (currentSection === 'issues') {
                    issues.push(item);
                }
                else if (currentSection === 'suggestions') {
                    suggestions.push(item);
                }
            }
        }
        return { issues: issues, suggestions: suggestions, quality: quality };
    };
    Object.defineProperty(QwenAPI.prototype, "isInitialized", {
        get: function () {
            return this.initialized;
        },
        enumerable: false,
        configurable: true
    });
    return QwenAPI;
}());
exports.QwenAPI = QwenAPI;
