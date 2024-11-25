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
exports.BaseAPI = void 0;
/**
 * Base API client with common functionality for all API integrations
 * @abstract
 */
var thought_logger_1 = require("../logging/thought-logger");
var AppError_1 = require("../errors/AppError");
var BaseAPI = /** @class */ (function () {
    function BaseAPI() {
    }
    /**
     * Makes an authenticated API request
     * @template T Response data type
     * @param endpoint API endpoint path
     * @param options Request options
     * @returns Promise resolving to response data
     * @throws {AppError} On request failure
     */
    BaseAPI.prototype.request = function (endpoint_1) {
        return __awaiter(this, arguments, void 0, function (endpoint, options) {
            var _a, method, body, _b, headers, signal, response, errorData, data, error_1;
            var _c;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = options.method, method = _a === void 0 ? 'GET' : _a, body = options.body, _b = options.headers, headers = _b === void 0 ? {} : _b, signal = options.signal;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, , 7]);
                        thought_logger_1.thoughtLogger.log('execution', "API Request: ".concat(method, " ").concat(endpoint));
                        return [4 /*yield*/, fetch("".concat(this.baseUrl).concat(endpoint), __assign(__assign({ method: method, headers: __assign({ 'Content-Type': 'application/json', 'Authorization': "Bearer ".concat(this.apiKey) }, headers) }, (body && { body: JSON.stringify(body) })), { signal: signal }))];
                    case 2:
                        response = _d.sent();
                        if (!!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.json().catch(function () { return ({}); })];
                    case 3:
                        errorData = _d.sent();
                        throw new AppError_1.AppError("API request failed: ".concat(((_c = errorData.error) === null || _c === void 0 ? void 0 : _c.message) || response.statusText), 'API_ERROR', __assign({ status: response.status }, errorData));
                    case 4: return [4 /*yield*/, response.json()];
                    case 5:
                        data = _d.sent();
                        thought_logger_1.thoughtLogger.log('success', 'API request successful');
                        return [2 /*return*/, {
                                data: data,
                                headers: Object.fromEntries(response.headers.entries()),
                                status: response.status
                            }];
                    case 6:
                        error_1 = _d.sent();
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
    /**
     * Handles streaming responses
     * @param response Fetch Response object
     * @param onProgress Progress callback
     * @returns Promise resolving to complete response content
     */
    BaseAPI.prototype.handleStream = function (response, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var reader, decoder, fullContent, _a, done, value, chunk, lines, _i, lines_1, line, data, parsed, content;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        reader = (_b = response.body) === null || _b === void 0 ? void 0 : _b.getReader();
                        if (!reader) {
                            throw new AppError_1.AppError('No response body available for streaming', 'STREAM_ERROR');
                        }
                        decoder = new TextDecoder();
                        fullContent = '';
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, , 5, 6]);
                        _f.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 4];
                        return [4 /*yield*/, reader.read()];
                    case 3:
                        _a = _f.sent(), done = _a.done, value = _a.value;
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
                                    content = (_e = (_d = (_c = parsed.choices) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.delta) === null || _e === void 0 ? void 0 : _e.content;
                                    if (content) {
                                        fullContent += content;
                                        onProgress === null || onProgress === void 0 ? void 0 : onProgress(content);
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
    return BaseAPI;
}());
exports.BaseAPI = BaseAPI;
