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
exports.vectorStore = exports.VectorStore = void 0;
var pinecone_client_1 = require("./pinecone-client");
var thought_logger_1 = require("../logging/thought-logger");
var AppError_1 = require("../errors/AppError");
var cache_manager_1 = require("../cache/cache-manager");
var VectorStore = /** @class */ (function () {
    function VectorStore() {
        this.namespace = 'vectors';
        this.cacheTTL = 3600; // 1 hour
        this.pinecone = pinecone_client_1.PineconeClient.getInstance();
    }
    VectorStore.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pinecone.initialize()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VectorStore.prototype.addDocument = function (content, type, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var id, vector, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        id = crypto.randomUUID();
                        return [4 /*yield*/, this.generateEmbedding(content)];
                    case 1:
                        vector = _a.sent();
                        return [4 /*yield*/, this.pinecone.upsert([{
                                    id: id,
                                    values: vector,
                                    metadata: __assign({ content: content, type: type, timestamp: Date.now() }, metadata)
                                }])];
                    case 2:
                        _a.sent();
                        // Cache the vector
                        return [4 /*yield*/, cache_manager_1.cacheManager.set("vector:".concat(id), { vector: vector, metadata: metadata }, { ttl: this.cacheTTL, namespace: this.namespace })];
                    case 3:
                        // Cache the vector
                        _a.sent();
                        return [2 /*return*/, id];
                    case 4:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to add document to vector store', { error: error_1 });
                        throw new AppError_1.AppError('Vector store operation failed', 'VECTOR_DB_ERROR', error_1);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    VectorStore.prototype.search = function (query_1) {
        return __awaiter(this, arguments, void 0, function (query, similarity, limit) {
            var queryVector, results, error_2;
            if (similarity === void 0) { similarity = 0.7; }
            if (limit === void 0) { limit = 10; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.generateEmbedding(query)];
                    case 1:
                        queryVector = _a.sent();
                        return [4 /*yield*/, this.pinecone.query(queryVector, {
                                topK: limit,
                                includeMetadata: true
                            })];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, results.matches
                                .filter(function (match) { return match.score >= similarity; })
                                .map(function (match) { return ({
                                id: match.id,
                                score: match.score,
                                metadata: match.metadata
                            }); })];
                    case 3:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Vector search failed', { error: error_2 });
                        throw new AppError_1.AppError('Vector search failed', 'VECTOR_DB_ERROR', error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VectorStore.prototype.generateEmbedding = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var vector, tokens, i, token, tokenHash, j, magnitude;
            return __generator(this, function (_a) {
                vector = new Array(384).fill(0);
                tokens = text.toLowerCase()
                    .replace(/[^\w\s]/g, '')
                    .split(/\s+/)
                    .filter(Boolean);
                // Generate semantic embedding
                for (i = 0; i < tokens.length; i++) {
                    token = tokens[i];
                    tokenHash = this.hashString(token);
                    // Distribute token influence across embedding
                    for (j = 0; j < 384; j++) {
                        vector[j] += Math.sin(tokenHash * (j + 1)) / tokens.length;
                    }
                }
                magnitude = Math.sqrt(vector.reduce(function (sum, val) { return sum + val * val; }, 0));
                return [2 /*return*/, vector.map(function (val) { return val / magnitude; })];
            });
        });
    };
    VectorStore.prototype.hashString = function (str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    };
    VectorStore.prototype.deleteVector = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.pinecone.delete([id])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, cache_manager_1.cacheManager.delete("vector:".concat(id), this.namespace)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to delete vector', { error: error_3 });
                        throw new AppError_1.AppError('Vector deletion failed', 'VECTOR_DB_ERROR', error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VectorStore.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.pinecone.deleteAll()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, cache_manager_1.cacheManager.clear(this.namespace)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to clear vector store', { error: error_4 });
                        throw new AppError_1.AppError('Vector store clear failed', 'VECTOR_DB_ERROR', error_4);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VectorStore.prototype.getStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.pinecone.describeIndex()];
            });
        });
    };
    return VectorStore;
}());
exports.VectorStore = VectorStore;
exports.vectorStore = new VectorStore();
