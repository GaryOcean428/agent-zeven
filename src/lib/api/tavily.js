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
exports.TavilyAPI = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var AppError_1 = require("../errors/AppError");
var config_1 = require("../config");
var TavilyAPI = /** @class */ (function () {
    function TavilyAPI() {
        this.baseUrl = 'https://api.tavily.com/v1';
        this.apiKey = config_1.config.apiKeys.tavily;
        if (!this.apiKey) {
            thought_logger_1.thoughtLogger.log('warning', 'Tavily API key not configured');
        }
    }
    TavilyAPI.prototype.search = function (query_1) {
        return __awaiter(this, arguments, void 0, function (query, options) {
            var response, data, error_1;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.apiKey) {
                            throw new AppError_1.AppError('Tavily API key not configured', 'API_ERROR');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("".concat(this.baseUrl, "/search"), {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'api-key': this.apiKey
                                },
                                body: JSON.stringify({
                                    query: query,
                                    search_depth: options.searchDepth || 'advanced',
                                    include_images: options.includeImages || false,
                                    include_answer: options.includeAnswers || true,
                                    max_results: options.maxResults || 10
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new AppError_1.AppError("Tavily API error: ".concat(response.statusText), 'API_ERROR', { status: response.status });
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, this.formatResults(data)];
                    case 4:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Tavily search failed', { error: error_1 });
                        throw error_1 instanceof AppError_1.AppError ? error_1 : new AppError_1.AppError('Failed to search with Tavily', 'API_ERROR', error_1);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TavilyAPI.prototype.extract = function (url_1) {
        return __awaiter(this, arguments, void 0, function (url, options) {
            var response, data, error_2;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.apiKey) {
                            throw new AppError_1.AppError('Tavily API key not configured', 'API_ERROR');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("".concat(this.baseUrl, "/extract"), {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'api-key': this.apiKey
                                },
                                body: JSON.stringify({
                                    url: url,
                                    include_summary: options.include_summary || true,
                                    max_results: options.max_results || 5
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new AppError_1.AppError("Tavily API error: ".concat(response.statusText), 'API_ERROR', { status: response.status });
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, this.formatExtractedContent(data)];
                    case 4:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Tavily extraction failed', { error: error_2 });
                        throw error_2 instanceof AppError_1.AppError ? error_2 : new AppError_1.AppError('Failed to extract content with Tavily', 'API_ERROR', error_2);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TavilyAPI.prototype.formatResults = function (data) {
        var _a;
        var formattedContent = '';
        if (data.answer) {
            formattedContent += "".concat(data.answer, "\n\n");
        }
        if ((_a = data.results) === null || _a === void 0 ? void 0 : _a.length) {
            formattedContent += '### Sources\n\n';
            data.results.forEach(function (result) {
                formattedContent += "**".concat(result.title, "**\n").concat(result.snippet, "\n[").concat(result.url, "](").concat(result.url, ")\n\n");
            });
        }
        return formattedContent.trim();
    };
    TavilyAPI.prototype.formatExtractedContent = function (data) {
        var formattedContent = '';
        if (data.summary) {
            formattedContent += "### Summary\n".concat(data.summary, "\n\n");
        }
        if (data.content) {
            formattedContent += "### Content\n".concat(data.content, "\n\n");
        }
        if (data.metadata) {
            formattedContent += "### Metadata\n";
            Object.entries(data.metadata).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                formattedContent += "- ".concat(key, ": ").concat(value, "\n");
            });
        }
        return formattedContent.trim();
    };
    return TavilyAPI;
}());
exports.TavilyAPI = TavilyAPI;
