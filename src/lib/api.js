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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
exports.makeAPIRequest = makeAPIRequest;
exports.chatCompletion = chatCompletion;
exports.createEmbeddings = createEmbeddings;
var config_1 = require("./config");
var memory_1 = require("./memory");
var APIError = /** @class */ (function (_super) {
    __extends(APIError, _super);
    function APIError(message, status, details) {
        var _this = _super.call(this, message) || this;
        _this.status = status;
        _this.details = details;
        _this.name = 'APIError';
        return _this;
    }
    return APIError;
}(Error));
exports.APIError = APIError;
var memory = new memory_1.Memory();
function makeAPIRequest(endpoint_1) {
    return __awaiter(this, arguments, void 0, function (endpoint, options) {
        var _a, method, _b, headers, body, response, _c, _d, error_1;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = options.method, method = _a === void 0 ? 'GET' : _a, _b = options.headers, headers = _b === void 0 ? {} : _b, body = options.body;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("".concat(config_1.XAI_CONFIG.baseUrl).concat(endpoint), __assign({ method: method, headers: __assign({ 'Content-Type': 'application/json' }, headers) }, (body && { body: JSON.stringify(body) })))];
                case 2:
                    response = _e.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    _c = APIError.bind;
                    _d = [void 0, 'API request failed',
                        response.status];
                    return [4 /*yield*/, response.text()];
                case 3: throw new (_c.apply(APIError, _d.concat([_e.sent()])))();
                case 4: return [4 /*yield*/, response.json()];
                case 5: return [2 /*return*/, _e.sent()];
                case 6:
                    error_1 = _e.sent();
                    if (error_1 instanceof APIError)
                        throw error_1;
                    throw new APIError(error_1 instanceof Error ? error_1.message : 'API request failed');
                case 7: return [2 /*return*/];
            }
        });
    });
}
function chatCompletion(messages, onProgress) {
    return __awaiter(this, void 0, void 0, function () {
        var context, systemMessage, response, _a, _b, reader, decoder, buffer, responseContent_1, _c, done, value, lines, _i, lines_1, line, data_1, parsed, content, data, responseContent, error_2;
        var _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _j.trys.push([0, 12, , 13]);
                    return [4 /*yield*/, memory.getRelevantMemories(messages[0].content)];
                case 1:
                    context = _j.sent();
                    systemMessage = {
                        role: 'system',
                        content: "You are Agent One, an AI assistant. Here is the context from previous conversations:\n\n".concat(context)
                    };
                    return [4 /*yield*/, fetch("".concat(config_1.XAI_CONFIG.baseUrl, "/chat/completions"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer ".concat(config_1.XAI_CONFIG.apiKey),
                            },
                            body: JSON.stringify({
                                messages: __spreadArray([systemMessage], messages, true),
                                model: config_1.XAI_CONFIG.defaultModel,
                                stream: Boolean(onProgress),
                                temperature: config_1.XAI_CONFIG.temperature,
                                max_tokens: config_1.XAI_CONFIG.maxTokens,
                            }),
                        })];
                case 2:
                    response = _j.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    _a = APIError.bind;
                    _b = [void 0, 'Chat API request failed',
                        response.status];
                    return [4 /*yield*/, response.text()];
                case 3: throw new (_a.apply(APIError, _b.concat([_j.sent()])))();
                case 4:
                    if (!(onProgress && response.body)) return [3 /*break*/, 9];
                    reader = response.body.getReader();
                    decoder = new TextDecoder();
                    buffer = '';
                    responseContent_1 = '';
                    _j.label = 5;
                case 5:
                    if (!true) return [3 /*break*/, 7];
                    return [4 /*yield*/, reader.read()];
                case 6:
                    _c = _j.sent(), done = _c.done, value = _c.value;
                    if (done)
                        return [3 /*break*/, 7];
                    buffer += decoder.decode(value, { stream: true });
                    lines = buffer.split('\n');
                    buffer = lines.pop() || '';
                    for (_i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                        line = lines_1[_i];
                        if (line.startsWith('data: ')) {
                            data_1 = line.slice(6);
                            if (data_1 === '[DONE]')
                                continue;
                            try {
                                parsed = JSON.parse(data_1);
                                content = (_f = (_e = (_d = parsed.choices) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.delta) === null || _f === void 0 ? void 0 : _f.content;
                                if (content) {
                                    responseContent_1 += content;
                                    onProgress(content);
                                }
                            }
                            catch (e) {
                                console.error('Failed to parse streaming response:', e);
                            }
                        }
                    }
                    return [3 /*break*/, 5];
                case 7: return [4 /*yield*/, memory.store(messages[0], {
                        id: crypto.randomUUID(),
                        role: 'assistant',
                        content: responseContent_1,
                        timestamp: Date.now()
                    })];
                case 8:
                    _j.sent();
                    return [2 /*return*/];
                case 9: return [4 /*yield*/, response.json()];
                case 10:
                    data = _j.sent();
                    responseContent = ((_h = (_g = data.choices[0]) === null || _g === void 0 ? void 0 : _g.message) === null || _h === void 0 ? void 0 : _h.content) || '';
                    return [4 /*yield*/, memory.store(messages[0], {
                            id: crypto.randomUUID(),
                            role: 'assistant',
                            content: responseContent,
                            timestamp: Date.now()
                        })];
                case 11:
                    _j.sent();
                    return [2 /*return*/, responseContent];
                case 12:
                    error_2 = _j.sent();
                    if (error_2 instanceof APIError)
                        throw error_2;
                    throw new APIError(error_2 instanceof Error ? error_2.message : 'Chat request failed');
                case 13: return [2 /*return*/];
            }
        });
    });
}
function createEmbeddings(text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, makeAPIRequest('/embeddings', {
                    method: 'POST',
                    headers: {
                        'Authorization': "Bearer ".concat(config_1.XAI_CONFIG.apiKey),
                    },
                    body: {
                        input: text,
                        model: config_1.XAI_CONFIG.embeddingModel,
                    },
                })];
        });
    });
}
