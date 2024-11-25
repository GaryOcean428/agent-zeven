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
var pinecone_index_manager_1 = require("../pinecone-index-manager");
var pinecone_store_client_1 = require("../pinecone-store-client");
// These tests require actual Pinecone credentials
// They should only run in a CI environment or locally with proper credentials
describe('Pinecone Integration Tests', function () {
    var indexManager;
    var vectorStore;
    var testIndexConfig = {
        name: "test-index-".concat(Date.now()),
        dimension: 384,
        metric: 'cosine',
        pods: 1,
        replicas: 1,
        podType: 'p1.x1'
    };
    var vectorStoreConfig = {
        dimension: 384,
        metric: 'cosine',
        namespace: 'test-namespace',
        batchSize: 100,
        maxRetries: 3,
        apiKeys: {
            pinecone: process.env.PINECONE_API_KEY
        },
        services: {
            pinecone: {
                environment: process.env.PINECONE_ENVIRONMENT,
                indexName: testIndexConfig.name
            }
        }
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Skip if no credentials
                    if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_ENVIRONMENT) {
                        console.log('Skipping Pinecone integration tests - no credentials');
                        return [2 /*return*/];
                    }
                    indexManager = new pinecone_index_manager_1.PineconeIndexManager();
                    return [4 /*yield*/, indexManager.initialize(process.env.PINECONE_API_KEY, process.env.PINECONE_ENVIRONMENT)];
                case 1:
                    _a.sent();
                    // Create test index
                    return [4 /*yield*/, indexManager.createIndex(testIndexConfig)];
                case 2:
                    // Create test index
                    _a.sent();
                    // Initialize vector store
                    vectorStore = new pinecone_store_client_1.PineconeStoreClient();
                    return [4 /*yield*/, vectorStore.initialize(vectorStoreConfig)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!process.env.PINECONE_API_KEY)
                        return [2 /*return*/];
                    // Cleanup
                    return [4 /*yield*/, indexManager.deleteIndex(testIndexConfig.name)];
                case 1:
                    // Cleanup
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Index Management', function () {
        it('should list indexes including test index', function () { return __awaiter(void 0, void 0, void 0, function () {
            var indexes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, indexManager.listIndexes()];
                    case 1:
                        indexes = _a.sent();
                        expect(indexes).toContain(testIndexConfig.name);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should describe index correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var description;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, indexManager.describeIndex(testIndexConfig.name)];
                    case 1:
                        description = _a.sent();
                        expect(description.dimension).toBe(testIndexConfig.dimension);
                        expect(description.metric).toBe(testIndexConfig.metric);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should get index statistics', function () { return __awaiter(void 0, void 0, void 0, function () {
            var stats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, indexManager.getIndexStats(testIndexConfig.name)];
                    case 1:
                        stats = _a.sent();
                        expect(stats.vectorCount).toBeDefined();
                        expect(stats.dimensionCount).toBe(testIndexConfig.dimension);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Vector Operations', function () {
        var testVectors = [
            {
                id: 'test-1',
                values: Array(384).fill(0.1),
                metadata: { source: 'test' }
            },
            {
                id: 'test-2',
                values: Array(384).fill(0.2),
                metadata: { source: 'test' }
            }
        ];
        it('should upsert and query vectors', function () { return __awaiter(void 0, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Upsert test vectors
                    return [4 /*yield*/, vectorStore.upsert(testVectors)];
                    case 1:
                        // Upsert test vectors
                        _a.sent();
                        return [4 /*yield*/, vectorStore.query({
                                vector: testVectors[0].values,
                                topK: 2,
                                includeMetadata: true
                            })];
                    case 2:
                        results = _a.sent();
                        expect(results.matches).toHaveLength(2);
                        expect(results.matches[0].id).toBe('test-1');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fetch specific vectors', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fetched;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vectorStore.fetch(['test-1'])];
                    case 1:
                        fetched = _a.sent();
                        expect(fetched).toHaveLength(1);
                        expect(fetched[0].id).toBe('test-1');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should delete vectors', function () { return __awaiter(void 0, void 0, void 0, function () {
            var remaining;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vectorStore.delete(['test-2'])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, vectorStore.fetch(['test-2'])];
                    case 2:
                        remaining = _a.sent();
                        expect(remaining).toHaveLength(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
