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
exports.PineconeStoreClient = void 0;
var pinecone_1 = require("@pinecone-database/pinecone");
var thought_logger_1 = require("../logging/thought-logger");
var vector_store_client_1 = require("./vector-store-client");
var PineconeStoreClient = /** @class */ (function (_super) {
    __extends(PineconeStoreClient, _super);
    function PineconeStoreClient() {
        var _this = _super.call(this) || this;
        _this.pinecone = new pinecone_1.PineconeClient();
        return _this;
    }
    PineconeStoreClient.prototype.initialize = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var indexList, error_1;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, _super.prototype.initialize.call(this, config)];
                    case 1:
                        _f.sent();
                        if (!((_a = config.apiKeys) === null || _a === void 0 ? void 0 : _a.pinecone)) {
                            throw new Error('Pinecone API key not configured');
                        }
                        return [4 /*yield*/, this.pinecone.init({
                                apiKey: config.apiKeys.pinecone,
                                environment: ((_c = (_b = config.services) === null || _b === void 0 ? void 0 : _b.pinecone) === null || _c === void 0 ? void 0 : _c.environment) || 'production'
                            })];
                    case 2:
                        _f.sent();
                        this.indexName = ((_e = (_d = config.services) === null || _d === void 0 ? void 0 : _d.pinecone) === null || _e === void 0 ? void 0 : _e.indexName) || 'default-index';
                        this.namespace = config.namespace || 'default';
                        return [4 /*yield*/, this.pinecone.listIndexes()];
                    case 3:
                        indexList = _f.sent();
                        if (!indexList.includes(this.indexName)) {
                            throw new Error("Pinecone index ".concat(this.indexName, " not found"));
                        }
                        thought_logger_1.thoughtLogger.log('execution', 'Pinecone store initialized', {
                            indexName: this.indexName,
                            namespace: this.namespace
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _f.sent();
                        this.handleError('INITIALIZATION_ERROR', 'Failed to initialize Pinecone store', error_1);
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PineconeStoreClient.prototype.upsert = function (vectors) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, index, vectorIds, i, batch, upsertRequest, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateInitialization();
                        startTime = Date.now();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        index = this.pinecone.Index(this.indexName);
                        vectorIds = [];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < vectors.length)) return [3 /*break*/, 5];
                        batch = vectors.slice(i, i + this.config.batchSize);
                        upsertRequest = {
                            vectors: batch.map(function (vector) { return ({
                                id: vector.id,
                                values: vector.values,
                                metadata: vector.metadata
                            }); }),
                            namespace: this.namespace
                        };
                        return [4 /*yield*/, index.upsert({ upsertRequest: upsertRequest })];
                    case 3:
                        _a.sent();
                        vectorIds.push.apply(vectorIds, batch.map(function (v) { return v.id; }));
                        _a.label = 4;
                    case 4:
                        i += this.config.batchSize;
                        return [3 /*break*/, 2];
                    case 5:
                        this.updateMetrics('upsert', startTime, vectors.length);
                        return [2 /*return*/, vectorIds];
                    case 6:
                        error_2 = _a.sent();
                        this.handleError('OPERATION_ERROR', 'Pinecone upsert operation failed', error_2);
                        throw error_2;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PineconeStoreClient.prototype.query = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, index, queryRequest, queryResponse, response, error_3;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.validateInitialization();
                        startTime = Date.now();
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        index = this.pinecone.Index(this.indexName);
                        queryRequest = {
                            vector: query.vector,
                            topK: query.topK || 10,
                            namespace: query.namespace || this.namespace,
                            includeMetadata: (_a = query.includeMetadata) !== null && _a !== void 0 ? _a : true,
                            filter: this.transformFilter(query.filter)
                        };
                        return [4 /*yield*/, index.query({ queryRequest: queryRequest })];
                    case 2:
                        queryResponse = _c.sent();
                        response = {
                            matches: ((_b = queryResponse.matches) === null || _b === void 0 ? void 0 : _b.map(function (match) { return ({
                                id: match.id,
                                score: match.score,
                                values: match.values,
                                metadata: match.metadata
                            }); })) || [],
                            namespace: query.namespace || this.namespace
                        };
                        this.updateMetrics('query', startTime);
                        return [2 /*return*/, response];
                    case 3:
                        error_3 = _c.sent();
                        this.handleError('QUERY_ERROR', 'Pinecone query operation failed', error_3);
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PineconeStoreClient.prototype.delete = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var index, i, batch, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateInitialization();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        index = this.pinecone.Index(this.indexName);
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < ids.length)) return [3 /*break*/, 5];
                        batch = ids.slice(i, i + this.config.batchSize);
                        return [4 /*yield*/, index.delete1({
                                ids: batch,
                                namespace: this.namespace
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i += this.config.batchSize;
                        return [3 /*break*/, 2];
                    case 5:
                        this.metrics.operations.deletes += ids.length;
                        thought_logger_1.thoughtLogger.log('execution', 'Vectors deleted from Pinecone', { count: ids.length });
                        return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        this.handleError('OPERATION_ERROR', 'Pinecone delete operation failed', error_4);
                        throw error_4;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PineconeStoreClient.prototype.fetch = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var index, vectors, i, batch, response, _i, _a, _b, id, vector, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.validateInitialization();
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        index = this.pinecone.Index(this.indexName);
                        vectors = [];
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < ids.length)) return [3 /*break*/, 5];
                        batch = ids.slice(i, i + this.config.batchSize);
                        return [4 /*yield*/, index.fetch({
                                ids: batch,
                                namespace: this.namespace
                            })];
                    case 3:
                        response = _c.sent();
                        if (response.vectors) {
                            for (_i = 0, _a = Object.entries(response.vectors); _i < _a.length; _i++) {
                                _b = _a[_i], id = _b[0], vector = _b[1];
                                vectors.push({
                                    id: id,
                                    values: vector.values,
                                    metadata: vector.metadata
                                });
                            }
                        }
                        _c.label = 4;
                    case 4:
                        i += this.config.batchSize;
                        return [3 /*break*/, 2];
                    case 5:
                        this.metrics.operations.fetches++;
                        return [2 /*return*/, vectors];
                    case 6:
                        error_5 = _c.sent();
                        this.handleError('OPERATION_ERROR', 'Pinecone fetch operation failed', error_5);
                        throw error_5;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PineconeStoreClient.prototype.transformFilter = function (filter) {
        if (!filter)
            return undefined;
        var pineconeFilter = {};
        if (filter.source) {
            pineconeFilter['source'] = { $eq: filter.source };
        }
        if (filter.type) {
            pineconeFilter['type'] = { $eq: filter.type };
        }
        if (filter.timestamp) {
            pineconeFilter['timestamp'] = {};
            if (filter.timestamp.gt) {
                pineconeFilter['timestamp']['$gt'] = filter.timestamp.gt;
            }
            if (filter.timestamp.lt) {
                pineconeFilter['timestamp']['$lt'] = filter.timestamp.lt;
            }
        }
        if (filter.metadata) {
            Object.entries(filter.metadata).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                pineconeFilter[key] = { $eq: value };
            });
        }
        return pineconeFilter;
    };
    PineconeStoreClient.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // Clean up Pinecone client resources if needed
                        return [4 /*yield*/, _super.prototype.close.call(this)];
                    case 1:
                        // Clean up Pinecone client resources if needed
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        this.handleError('CONNECTION_ERROR', 'Failed to close Pinecone store', error_6);
                        throw error_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PineconeStoreClient;
}(vector_store_client_1.VectorStoreClientImpl));
exports.PineconeStoreClient = PineconeStoreClient;
