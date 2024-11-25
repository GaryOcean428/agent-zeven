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
exports.PineconeIndexManager = void 0;
var pinecone_1 = require("@pinecone-database/pinecone");
var thought_logger_1 = require("../logging/thought-logger");
var PineconeIndexManager = /** @class */ (function () {
    function PineconeIndexManager() {
        this.isInitialized = false;
        this.client = new pinecone_1.PineconeClient();
    }
    PineconeIndexManager.prototype.initialize = function (apiKey, environment) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.init({
                                apiKey: apiKey,
                                environment: environment
                            })];
                    case 1:
                        _a.sent();
                        this.isInitialized = true;
                        thought_logger_1.thoughtLogger.log('execution', 'Pinecone index manager initialized');
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to initialize Pinecone index manager', { error: error_1 });
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PineconeIndexManager.prototype.createIndex = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateInitialization();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.createIndex({
                                name: config.name,
                                dimension: config.dimension,
                                metric: config.metric || 'cosine',
                                pods: config.pods || 1,
                                replicas: config.replicas || 1,
                                podType: config.podType || 'p1.x1',
                                metadata: config.metadata
                            })];
                    case 2:
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('execution', 'Created Pinecone index', { name: config.name });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to create Pinecone index', { error: error_2, config: config });
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PineconeIndexManager.prototype.deleteIndex = function (indexName) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateInitialization();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.deleteIndex(indexName)];
                    case 2:
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('execution', 'Deleted Pinecone index', { name: indexName });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to delete Pinecone index', { error: error_3, indexName: indexName });
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PineconeIndexManager.prototype.listIndexes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateInitialization();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.listIndexes()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_4 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to list Pinecone indexes', { error: error_4 });
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PineconeIndexManager.prototype.describeIndex = function (indexName) {
        return __awaiter(this, void 0, void 0, function () {
            var description, error_5;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.validateInitialization();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.describeIndex(indexName)];
                    case 2:
                        description = _b.sent();
                        return [2 /*return*/, {
                                name: indexName,
                                dimension: description.dimension,
                                metric: description.metric,
                                pods: description.pods,
                                replicas: description.replicas,
                                podType: description.podType,
                                vectorCount: description.vectorCount,
                                dimensionCount: description.dimension,
                                namespaceCount: ((_a = description.namespaces) === null || _a === void 0 ? void 0 : _a.length) || 0,
                                indexSize: description.indexSize || 0,
                                indexFullness: description.indexFullness || 0
                            }];
                    case 3:
                        error_5 = _b.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to describe Pinecone index', { error: error_5, indexName: indexName });
                        throw error_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PineconeIndexManager.prototype.configureIndex = function (indexName, updates) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateInitialization();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.configureIndex(indexName, {
                                replicas: updates.replicas,
                                podType: updates.podType
                            })];
                    case 2:
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('execution', 'Updated Pinecone index configuration', { indexName: indexName, updates: updates });
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to configure Pinecone index', { error: error_6, indexName: indexName, updates: updates });
                        throw error_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PineconeIndexManager.prototype.getIndexStats = function (indexName) {
        return __awaiter(this, void 0, void 0, function () {
            var stats, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateInitialization();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.describeIndexStats(indexName)];
                    case 2:
                        stats = _a.sent();
                        return [2 /*return*/, {
                                vectorCount: stats.totalVectorCount,
                                dimensionCount: stats.dimension,
                                namespaceCount: Object.keys(stats.namespaces || {}).length,
                                indexSize: stats.indexSize || 0,
                                indexFullness: stats.indexFullness || 0
                            }];
                    case 3:
                        error_7 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to get Pinecone index stats', { error: error_7, indexName: indexName });
                        throw error_7;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PineconeIndexManager.prototype.getIndexMetrics = function (indexName) {
        return __awaiter(this, void 0, void 0, function () {
            var metrics, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateInitialization();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.describeIndex(indexName)];
                    case 2:
                        metrics = _a.sent();
                        return [2 /*return*/, {
                                totalRequests: 0,
                                averageLatency: 0,
                                errorRate: 0,
                                throughput: 0
                            }];
                    case 3:
                        error_8 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to get Pinecone index metrics', { error: error_8, indexName: indexName });
                        throw error_8;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PineconeIndexManager.prototype.validateInitialization = function () {
        if (!this.isInitialized) {
            throw new Error('Pinecone index manager not initialized');
        }
    };
    return PineconeIndexManager;
}());
exports.PineconeIndexManager = PineconeIndexManager;
