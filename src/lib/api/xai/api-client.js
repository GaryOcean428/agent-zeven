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
exports.XaiAPI = void 0;
/**
 * X.AI API client implementation
 */
var base_api_1 = require("../base-api");
var AppError_1 = require("../../errors/AppError");
var thought_logger_1 = require("../../logging/thought-logger");
var config_1 = require("./config");
var config_validator_1 = require("./config-validator");
var rate_limiter_1 = require("./rate-limiter");
var XaiAPI = /** @class */ (function (_super) {
    __extends(XaiAPI, _super);
    function XaiAPI() {
        var _this = _super.call(this) || this;
        _this.baseUrl = config_1.xaiConfig.baseUrl;
        _this.apiKey = config_1.xaiConfig.apiKey;
        try {
            config_validator_1.ConfigValidator.validateConfig(config_1.xaiConfig);
            _this.rateLimiter = new rate_limiter_1.RateLimiter(config_1.xaiConfig.rateLimits.requestsPerMinute, config_1.xaiConfig.rateLimits.tokensPerMinute);
            thought_logger_1.thoughtLogger.log('success', 'X.AI API initialized successfully');
        }
        catch (error) {
            thought_logger_1.thoughtLogger.log('error', 'Failed to initialize X.AI API', { error: error });
            throw error;
        }
        return _this;
    }
    XaiAPI.getInstance = function () {
        if (!XaiAPI.instance) {
            XaiAPI.instance = new XaiAPI();
        }
        return XaiAPI.instance;
    };
    /**
     * Sends a chat completion request
     * @param messages Chat messages
     * @param onProgress Optional progress callback for streaming
     * @param options Request options
     * @returns Promise resolving to response content
     */
    XaiAPI.prototype.chat = function (messages_1, onProgress_1) {
        return __awaiter(this, arguments, void 0, function (messages, onProgress, options) {
            var estimatedTokens, controller_1, timeoutId, response, errorData, data, error_1;
            var _a, _b, _c, _d, _e;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 6, , 7]);
                        estimatedTokens = this.estimateTokenCount(messages);
                        return [4 /*yield*/, this.rateLimiter.checkRateLimit(estimatedTokens)];
                    case 1:
                        _f.sent();
                        controller_1 = new AbortController();
                        timeoutId = setTimeout(function () { return controller_1.abort(); }, 30000);
                        return [4 /*yield*/, fetch("".concat(this.baseUrl, "/chat/completions"), {
                                method: 'POST',
                                headers: {
                                    'Authorization': "Bearer ".concat(this.apiKey),
                                    'Content-Type': 'application/json',
                                    'X-API-Version': config_1.xaiConfig.apiVersion
                                },
                                body: JSON.stringify({
                                    model: options.model || config_1.xaiConfig.defaultModel,
                                    messages: messages.map(function (_a) {
                                        var role = _a.role, content = _a.content;
                                        return ({ role: role, content: content });
                                    }),
                                    temperature: (_a = options.temperature) !== null && _a !== void 0 ? _a : config_1.xaiConfig.temperature,
                                    max_tokens: (_b = options.maxTokens) !== null && _b !== void 0 ? _b : config_1.xaiConfig.maxTokens,
                                    stream: Boolean(onProgress)
                                }),
                                signal: controller_1.signal
                            })];
                    case 2:
                        response = _f.sent();
                        clearTimeout(timeoutId);
                        if (!!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.json().catch(function () { return ({}); })];
                    case 3:
                        errorData = _f.sent();
                        throw new AppError_1.AppError("X.AI API error: ".concat(((_c = errorData.error) === null || _c === void 0 ? void 0 : _c.message) || response.statusText), 'API_ERROR', __assign({ status: response.status }, errorData));
                    case 4:
                        if (onProgress && response.body) {
                            return [2 /*return*/, this.handleStream(response, onProgress)];
                        }
                        return [4 /*yield*/, this.request('/chat/completions', {
                                method: 'POST',
                                body: {
                                    model: options.model || config_1.xaiConfig.defaultModel,
                                    messages: messages.map(function (_a) {
                                        var role = _a.role, content = _a.content;
                                        return ({ role: role, content: content });
                                    }),
                                    temperature: (_d = options.temperature) !== null && _d !== void 0 ? _d : config_1.xaiConfig.temperature,
                                    max_tokens: (_e = options.maxTokens) !== null && _e !== void 0 ? _e : config_1.xaiConfig.maxTokens
                                }
                            })];
                    case 5:
                        data = (_f.sent()).data;
                        return [2 /*return*/, data.choices[0].message.content];
                    case 6:
                        error_1 = _f.sent();
                        thought_logger_1.thoughtLogger.log('error', 'X.AI API request failed', { error: error_1 });
                        throw error_1 instanceof AppError_1.AppError ? error_1 : new AppError_1.AppError('Failed to communicate with X.AI API', 'API_ERROR', { originalError: error_1 });
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    XaiAPI.prototype.estimateTokenCount = function (messages) {
        return messages.reduce(function (sum, msg) { return sum + Math.ceil(msg.content.length / 4); }, 0);
    };
    return XaiAPI;
}(base_api_1.BaseAPI));
exports.XaiAPI = XaiAPI;
