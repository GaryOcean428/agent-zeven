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
exports.VectorMemory = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var AppError_1 = require("../errors/AppError");
var VectorMemory = /** @class */ (function () {
    function VectorMemory() {
        this.memories = [];
        this.dimensions = 384; // Standard for small-medium models
        this.maxMemories = 1000;
    }
    VectorMemory.prototype.store = function (content, type, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var embedding, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('plan', 'Storing new memory', { type: type, metadata: metadata });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.generateEmbedding(content)];
                    case 2:
                        embedding = _a.sent();
                        this.memories.push({
                            id: crypto.randomUUID(),
                            content: content,
                            type: type,
                            timestamp: Date.now(),
                            embedding: embedding,
                            metadata: metadata
                        });
                        // Keep only recent memories to prevent bloat
                        if (this.memories.length > this.maxMemories) {
                            this.memories = this.memories.slice(-this.maxMemories);
                        }
                        thought_logger_1.thoughtLogger.log('success', 'Memory stored successfully', {
                            memoryCount: this.memories.length
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to store memory', { error: error_1 });
                        throw new AppError_1.AppError('Failed to store memory', 'MEMORY_ERROR', error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VectorMemory.prototype.recall = function (query_1) {
        return __awaiter(this, arguments, void 0, function (query, limit) {
            var queryEmbedding_1, scored, results, error_2;
            var _this = this;
            var _a;
            if (limit === void 0) { limit = 5; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('plan', 'Recalling memories', { query: query, limit: limit });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        if (this.memories.length === 0) {
                            thought_logger_1.thoughtLogger.log('observation', 'No memories available');
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.generateEmbedding(query)];
                    case 2:
                        queryEmbedding_1 = _b.sent();
                        scored = this.memories.map(function (memory) { return ({
                            content: memory.content,
                            score: _this.cosineSimilarity(queryEmbedding_1, memory.embedding),
                            timestamp: memory.timestamp
                        }); });
                        // Sort by score and recency
                        scored.sort(function (a, b) {
                            var scoreDiff = b.score - a.score;
                            if (Math.abs(scoreDiff) > 0.1) {
                                return scoreDiff;
                            }
                            return b.timestamp - a.timestamp;
                        });
                        results = scored
                            .filter(function (result) { return result.score > 0.7; })
                            .slice(0, limit)
                            .map(function (_a) {
                            var content = _a.content, score = _a.score;
                            return ({ content: content, score: score });
                        });
                        thought_logger_1.thoughtLogger.log('success', 'Memories recalled successfully', {
                            matchCount: results.length,
                            topScore: (_a = results[0]) === null || _a === void 0 ? void 0 : _a.score
                        });
                        return [2 /*return*/, results];
                    case 3:
                        error_2 = _b.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to recall memories', { error: error_2 });
                        throw new AppError_1.AppError('Failed to recall memories', 'MEMORY_ERROR', error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VectorMemory.prototype.generateEmbedding = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var embedding, tokens, i, token, tokenHash, j, magnitude;
            return __generator(this, function (_a) {
                embedding = new Array(this.dimensions).fill(0);
                tokens = text.toLowerCase()
                    .replace(/[^\w\s]/g, '')
                    .split(/\s+/)
                    .filter(Boolean);
                // Generate semantic embedding
                for (i = 0; i < tokens.length; i++) {
                    token = tokens[i];
                    tokenHash = this.hashString(token);
                    // Distribute token influence across embedding
                    for (j = 0; j < this.dimensions; j++) {
                        embedding[j] += Math.sin(tokenHash * (j + 1)) / tokens.length;
                    }
                }
                magnitude = Math.sqrt(embedding.reduce(function (sum, val) { return sum + val * val; }, 0));
                return [2 /*return*/, embedding.map(function (val) { return val / magnitude; })];
            });
        });
    };
    VectorMemory.prototype.hashString = function (str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    };
    VectorMemory.prototype.cosineSimilarity = function (a, b) {
        if (a.length !== b.length) {
            throw new Error('Vectors must have same length');
        }
        var dotProduct = a.reduce(function (sum, val, i) { return sum + val * b[i]; }, 0);
        var magnitudeA = Math.sqrt(a.reduce(function (sum, val) { return sum + val * val; }, 0));
        var magnitudeB = Math.sqrt(b.reduce(function (sum, val) { return sum + val * val; }, 0));
        return dotProduct / (magnitudeA * magnitudeB);
    };
    VectorMemory.prototype.getMemoryStats = function () {
        var types = this.memories.reduce(function (acc, mem) {
            acc[mem.type] = (acc[mem.type] || 0) + 1;
            return acc;
        }, {});
        return {
            count: this.memories.length,
            types: types
        };
    };
    VectorMemory.prototype.clear = function () {
        this.memories = [];
        thought_logger_1.thoughtLogger.log('success', 'Memory cleared');
    };
    return VectorMemory;
}());
exports.VectorMemory = VectorMemory;
