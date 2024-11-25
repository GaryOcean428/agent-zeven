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
exports.MoASearchAggregator = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var MoASearchAggregator = /** @class */ (function () {
    function MoASearchAggregator(config) {
        if (config === void 0) { config = {}; }
        this.numHeads = config.numHeads || 4;
        this.temperature = config.temperature || 0.7;
        this.maxTokens = config.maxTokens || 1024;
    }
    MoASearchAggregator.prototype.aggregate = function (results) {
        return __awaiter(this, void 0, void 0, function () {
            var headResults, aggregated, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('plan', 'Starting MoA-style result aggregation', {
                            numResults: results.length,
                            sources: results.map(function (r) { var _a; return (_a = r.metadata) === null || _a === void 0 ? void 0 : _a.source; })
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all(Array(this.numHeads).fill(0).map(function () {
                                return _this.processAttentionHead(results);
                            }))];
                    case 2:
                        headResults = _a.sent();
                        aggregated = this.combineHeadResults(headResults);
                        thought_logger_1.thoughtLogger.log('success', 'Results aggregated successfully', {
                            numHeads: this.numHeads,
                            resultLength: aggregated.length
                        });
                        return [2 /*return*/, aggregated];
                    case 3:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Result aggregation failed', { error: error_1 });
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MoASearchAggregator.prototype.processAttentionHead = function (results) {
        return __awaiter(this, void 0, void 0, function () {
            var scores, topResults;
            var _this = this;
            return __generator(this, function (_a) {
                scores = results.map(function (result) { return ({
                    content: result.content,
                    score: _this.calculateAttentionScore(result)
                }); });
                // Sort by attention score
                scores.sort(function (a, b) { return b.score - a.score; });
                topResults = scores.slice(0, 3);
                return [2 /*return*/, this.combineWithAttention(topResults)];
            });
        });
    };
    MoASearchAggregator.prototype.calculateAttentionScore = function (result) {
        var _a, _b;
        // Score based on multiple factors
        var sourceScore = this.getSourceScore((_a = result.metadata) === null || _a === void 0 ? void 0 : _a.source);
        var densityScore = this.calculateDensityScore(result.content);
        var relevanceScore = this.calculateRelevanceScore(result.content);
        var freshnessScore = this.calculateFreshnessScore((_b = result.metadata) === null || _b === void 0 ? void 0 : _b.timestamp);
        return (sourceScore + densityScore + relevanceScore + freshnessScore) / 4;
    };
    MoASearchAggregator.prototype.getSourceScore = function (source) {
        var sourceScores = {
            perplexity: 0.95,
            tavily: 0.9,
            google: 0.85,
            serp: 0.8
        };
        return source ? sourceScores[source] || 0.7 : 0.7;
    };
    MoASearchAggregator.prototype.calculateDensityScore = function (content) {
        var words = content.toLowerCase().split(/\s+/);
        var uniqueWords = new Set(words);
        return uniqueWords.size / words.length;
    };
    MoASearchAggregator.prototype.calculateRelevanceScore = function (content) {
        var _a, _b, _c;
        // Count relevance signals
        var dateMatches = ((_a = content.match(/\b\d{4}[-/]\d{2}[-/]\d{2}\b/g)) === null || _a === void 0 ? void 0 : _a.length) || 0;
        var numberMatches = ((_b = content.match(/\b\d+([.,]\d+)?\b/g)) === null || _b === void 0 ? void 0 : _b.length) || 0;
        var properNouns = ((_c = content.match(/(?<!^|\.\s+)\b[A-Z][a-z]+\b/g)) === null || _c === void 0 ? void 0 : _c.length) || 0;
        var totalSignals = dateMatches + numberMatches + properNouns;
        return Math.min(totalSignals / 10, 1);
    };
    MoASearchAggregator.prototype.calculateFreshnessScore = function (timestamp) {
        if (!timestamp)
            return 0.5;
        var age = Date.now() - new Date(timestamp).getTime();
        var hourAge = age / (1000 * 60 * 60);
        // Exponential decay based on age
        return Math.exp(-hourAge / 24);
    };
    MoASearchAggregator.prototype.combineWithAttention = function (results) {
        var _this = this;
        // Normalize scores
        var total = results.reduce(function (sum, r) { return sum + r.score; }, 0);
        var normalized = results.map(function (r) { return (__assign(__assign({}, r), { score: r.score / total })); });
        // Combine content with weighted attention
        return normalized
            .map(function (r) { return _this.truncateContent(r.content, Math.floor(_this.maxTokens * r.score)); })
            .join('\n\n');
    };
    MoASearchAggregator.prototype.truncateContent = function (content, maxLength) {
        if (content.length <= maxLength)
            return content;
        return content.slice(0, maxLength - 3) + '...';
    };
    MoASearchAggregator.prototype.combineHeadResults = function (headResults) {
        // Remove duplicates and near-duplicates
        var unique = this.deduplicateResults(headResults);
        return unique.join('\n\n');
    };
    MoASearchAggregator.prototype.deduplicateResults = function (results) {
        var _this = this;
        var unique = new Set();
        var output = [];
        var _loop_1 = function (result) {
            var simplified = result.toLowerCase().replace(/\s+/g, ' ').trim();
            var isDuplicate = Array.from(unique).some(function (existing) {
                return _this.calculateSimilarity(simplified, existing) > 0.8;
            });
            if (!isDuplicate) {
                unique.add(simplified);
                output.push(result);
            }
        };
        for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
            var result = results_1[_i];
            _loop_1(result);
        }
        return output;
    };
    MoASearchAggregator.prototype.calculateSimilarity = function (a, b) {
        var setA = new Set(a.split(' '));
        var setB = new Set(b.split(' '));
        var intersection = new Set(Array.from(setA).filter(function (x) { return setB.has(x); }));
        var union = new Set(__spreadArray(__spreadArray([], setA, true), setB, true));
        return intersection.size / union.size;
    };
    return MoASearchAggregator;
}());
exports.MoASearchAggregator = MoASearchAggregator;
