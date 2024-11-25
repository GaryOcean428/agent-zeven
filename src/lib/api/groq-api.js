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
exports.GroqAPI = void 0;
var base_api_1 = require("./base-api");
var AppError_1 = require("../errors/AppError");
var thought_logger_1 = require("../logging/thought-logger");
var GroqAPI = /** @class */ (function (_super) {
    __extends(GroqAPI, _super);
    function GroqAPI() {
        var _this = _super.call(this) || this;
        if (!_this.config.apiKeys.groq) {
            thought_logger_1.thoughtLogger.log('warning', 'Groq API key not configured');
        }
        return _this;
    }
    GroqAPI.getInstance = function () {
        if (!GroqAPI.instance) {
            GroqAPI.instance = new GroqAPI();
        }
        return GroqAPI.instance;
    };
    GroqAPI.prototype.chat = function (messages_1) {
        return __awaiter(this, arguments, void 0, function (messages, model, onProgress) {
            var response, data, error_1;
            if (model === void 0) { model = 'medium'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.config.apiKeys.groq) {
                            throw new AppError_1.AppError('Groq API key not configured', 'API_ERROR');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("".concat(this.config.services.groq.baseUrl, "/chat/completions"), {
                                method: 'POST',
                                headers: this.getHeaders(this.config.apiKeys.groq),
                                body: JSON.stringify({
                                    model: this.config.services.groq.models[model],
                                    messages: messages.map(function (_a) {
                                        var role = _a.role, content = _a.content;
                                        return ({ role: role, content: content });
                                    }),
                                    temperature: this.config.services.groq.temperature,
                                    max_tokens: this.config.services.groq.maxTokens,
                                    stream: Boolean(onProgress)
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new AppError_1.AppError("Groq API error: ".concat(response.statusText), 'API_ERROR', { status: response.status });
                        }
                        if (onProgress && response.body) {
                            return [2 /*return*/, this.handleStreamingResponse(response.body, onProgress)];
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, data.choices[0].message.content];
                    case 4:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Groq API request failed', { error: error_1 });
                        throw error_1 instanceof AppError_1.AppError ? error_1 : new AppError_1.AppError('Failed to communicate with Groq API', 'API_ERROR', { originalError: error_1 });
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GroqAPI.prototype.handleStreamingResponse = function (body, onProgress) {
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
                                    thought_logger_1.thoughtLogger.log('error', 'Failed to parse streaming response', { error: e });
                                }
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
    return GroqAPI;
}(base_api_1.BaseAPI));
exports.GroqAPI = GroqAPI;
