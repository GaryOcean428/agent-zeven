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
exports.searchService = void 0;
var moa_1 = require("../lib/search/moa");
var rag_processor_1 = require("../lib/search/rag-processor");
var perplexity_1 = require("../lib/api/perplexity");
var tavily_1 = require("../lib/api/tavily");
var google_search_1 = require("../lib/api/google-search");
var serp_1 = require("../lib/api/serp");
var thought_logger_1 = require("../lib/logging/thought-logger");
var SearchService = /** @class */ (function () {
    function SearchService() {
        this.perplexityAPI = new perplexity_1.PerplexityAPI();
        this.tavilyAPI = new tavily_1.TavilyAPI();
        this.googleSearchAPI = new google_search_1.GoogleSearchAPI();
        this.serpAPI = new serp_1.SerpAPI();
        this.moaAggregator = new moa_1.MoASearchAggregator();
        this.ragProcessor = new rag_processor_1.RagProcessor();
    }
    SearchService.getInstance = function () {
        if (!SearchService.instance) {
            SearchService.instance = new SearchService();
        }
        return SearchService.instance;
    };
    SearchService.prototype.search = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, perplexityResult, tavilyResult, fallbackResults, results, ragResults, aggregatedContent, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('plan', 'Starting concurrent search with MoA and RAG', { query: query });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, Promise.allSettled([
                                this.searchWithProvider('perplexity', function () { return _this.perplexityAPI.search(query); }),
                                this.searchWithProvider('tavily', function () { return _this.tavilyAPI.search(query); })
                            ])];
                    case 2:
                        _a = _b.sent(), perplexityResult = _a[0], tavilyResult = _a[1];
                        fallbackResults = [];
                        if (!(perplexityResult.status === 'rejected' || tavilyResult.status === 'rejected')) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.allSettled([
                                this.searchWithProvider('google', function () { return _this.googleSearchAPI.search(query); }),
                                this.searchWithProvider('serp', function () { return _this.serpAPI.search(query); })
                            ])];
                    case 3:
                        fallbackResults = _b.sent();
                        _b.label = 4;
                    case 4:
                        results = __spreadArray(__spreadArray(__spreadArray([], (perplexityResult.status === 'fulfilled' ? [perplexityResult.value] : []), true), (tavilyResult.status === 'fulfilled' ? [tavilyResult.value] : []), true), fallbackResults
                            .filter(function (result) {
                            return result.status === 'fulfilled';
                        })
                            .map(function (result) { return result.value; }), true);
                        return [4 /*yield*/, this.ragProcessor.process(results)];
                    case 5:
                        ragResults = _b.sent();
                        return [4 /*yield*/, this.moaAggregator.aggregate(ragResults)];
                    case 6:
                        aggregatedContent = _b.sent();
                        thought_logger_1.thoughtLogger.log('success', 'Search completed successfully', {
                            resultCount: results.length,
                            sources: results.map(function (r) { return r.metadata.source; })
                        });
                        return [2 /*return*/, aggregatedContent];
                    case 7:
                        error_1 = _b.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Search failed', { error: error_1 });
                        throw error_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    SearchService.prototype.searchWithProvider = function (provider, searchFn) {
        return __awaiter(this, void 0, void 0, function () {
            var content, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, searchFn()];
                    case 1:
                        content = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                content: content,
                                metadata: {
                                    source: provider,
                                    timestamp: new Date().toISOString()
                                }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', "".concat(provider, " search failed"), { error: error_2 });
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return SearchService;
}());
// Export singleton instance
exports.searchService = SearchService.getInstance();