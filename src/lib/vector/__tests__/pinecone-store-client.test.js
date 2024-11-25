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
var pinecone_1 = require("@pinecone-database/pinecone");
var pinecone_store_client_1 = require("../pinecone-store-client");
// Mock PineconeClient
jest.mock('@pinecone-database/pinecone');
jest.mock('../../logging/thought-logger');
describe('PineconeStoreClient', function () {
    var client;
    var mockPineconeClient;
    var mockConfig = {
        dimension: 384,
        metric: 'cosine',
        namespace: 'test-namespace',
        batchSize: 100,
        maxRetries: 3,
        apiKeys: {
            pinecone: 'test-api-key'
        },
        services: {
            pinecone: {
                environment: 'test-env',
                indexName: 'test-index'
            }
        }
    };
    var mockVectors = [
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
    beforeEach(function () {
        jest.clearAllMocks();
        client = new pinecone_store_client_1.PineconeStoreClient();
        mockPineconeClient = pinecone_1.PineconeClient;
    });
    describe('initialize', function () {
        it('should initialize successfully with valid config', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockPineconeClient.prototype.init.mockResolvedValueOnce(undefined);
                        mockPineconeClient.prototype.listIndexes.mockResolvedValueOnce(['test-index']);
                        return [4 /*yield*/, client.initialize(mockConfig)];
                    case 1:
                        _a.sent();
                        expect(mockPineconeClient.prototype.init).toHaveBeenCalledWith({
                            apiKey: 'test-api-key',
                            environment: 'test-env'
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw error if Pinecone API key is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var invalidConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invalidConfig = __assign(__assign({}, mockConfig), { apiKeys: {} });
                        return [4 /*yield*/, expect(client.initialize(invalidConfig))
                                .rejects
                                .toThrow('Pinecone API key not configured')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw error if index does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockPineconeClient.prototype.init.mockResolvedValueOnce(undefined);
                        mockPineconeClient.prototype.listIndexes.mockResolvedValueOnce(['other-index']);
                        return [4 /*yield*/, expect(client.initialize(mockConfig))
                                .rejects
                                .toThrow('Pinecone index test-index not found')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('upsert', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockPineconeClient.prototype.init.mockResolvedValueOnce(undefined);
                        mockPineconeClient.prototype.listIndexes.mockResolvedValueOnce(['test-index']);
                        return [4 /*yield*/, client.initialize(mockConfig)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should upsert vectors successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockIndex, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockIndex = {
                            upsert: jest.fn().mockResolvedValueOnce({ upsertedCount: 2 })
                        };
                        mockPineconeClient.prototype.Index.mockReturnValueOnce(mockIndex);
                        return [4 /*yield*/, client.upsert(mockVectors)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(['test-1', 'test-2']);
                        expect(mockIndex.upsert).toHaveBeenCalledWith({
                            upsertRequest: {
                                vectors: mockVectors.map(function (v) { return ({
                                    id: v.id,
                                    values: v.values,
                                    metadata: v.metadata
                                }); }),
                                namespace: 'test-namespace'
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle batch processing correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var largeVectorSet, mockIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        largeVectorSet = Array(250).fill(null).map(function (_, i) { return ({
                            id: "test-".concat(i),
                            values: Array(384).fill(0.1),
                            metadata: { source: 'test' }
                        }); });
                        mockIndex = {
                            upsert: jest.fn().mockResolvedValue({ upsertedCount: 100 })
                        };
                        mockPineconeClient.prototype.Index.mockReturnValue(mockIndex);
                        return [4 /*yield*/, client.upsert(largeVectorSet)];
                    case 1:
                        _a.sent();
                        expect(mockIndex.upsert).toHaveBeenCalledTimes(3);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('query', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockPineconeClient.prototype.init.mockResolvedValueOnce(undefined);
                        mockPineconeClient.prototype.listIndexes.mockResolvedValueOnce(['test-index']);
                        return [4 /*yield*/, client.initialize(mockConfig)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should query vectors successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockQuery, mockQueryResponse, mockIndex, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockQuery = {
                            vector: Array(384).fill(0.1),
                            topK: 5,
                            namespace: 'test-namespace',
                            includeMetadata: true
                        };
                        mockQueryResponse = {
                            matches: [
                                {
                                    id: 'test-1',
                                    score: 0.9,
                                    values: Array(384).fill(0.1),
                                    metadata: { source: 'test' }
                                }
                            ]
                        };
                        mockIndex = {
                            query: jest.fn().mockResolvedValueOnce(mockQueryResponse)
                        };
                        mockPineconeClient.prototype.Index.mockReturnValueOnce(mockIndex);
                        return [4 /*yield*/, client.query(mockQuery)];
                    case 1:
                        result = _a.sent();
                        expect(result.matches).toHaveLength(1);
                        expect(result.matches[0].id).toBe('test-1');
                        expect(mockIndex.query).toHaveBeenCalledWith({
                            queryRequest: {
                                vector: mockQuery.vector,
                                topK: 5,
                                namespace: 'test-namespace',
                                includeMetadata: true,
                                filter: undefined
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('delete', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockPineconeClient.prototype.init.mockResolvedValueOnce(undefined);
                        mockPineconeClient.prototype.listIndexes.mockResolvedValueOnce(['test-index']);
                        return [4 /*yield*/, client.initialize(mockConfig)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should delete vectors successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockIndex = {
                            delete1: jest.fn().mockResolvedValueOnce(undefined)
                        };
                        mockPineconeClient.prototype.Index.mockReturnValueOnce(mockIndex);
                        return [4 /*yield*/, client.delete(['test-1', 'test-2'])];
                    case 1:
                        _a.sent();
                        expect(mockIndex.delete1).toHaveBeenCalledWith({
                            ids: ['test-1', 'test-2'],
                            namespace: 'test-namespace'
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('fetch', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockPineconeClient.prototype.init.mockResolvedValueOnce(undefined);
                        mockPineconeClient.prototype.listIndexes.mockResolvedValueOnce(['test-index']);
                        return [4 /*yield*/, client.initialize(mockConfig)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fetch vectors successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockFetchResponse, mockIndex, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockFetchResponse = {
                            vectors: {
                                'test-1': {
                                    id: 'test-1',
                                    values: Array(384).fill(0.1),
                                    metadata: { source: 'test' }
                                }
                            }
                        };
                        mockIndex = {
                            fetch: jest.fn().mockResolvedValueOnce(mockFetchResponse)
                        };
                        mockPineconeClient.prototype.Index.mockReturnValueOnce(mockIndex);
                        return [4 /*yield*/, client.fetch(['test-1'])];
                    case 1:
                        result = _a.sent();
                        expect(result).toHaveLength(1);
                        expect(result[0].id).toBe('test-1');
                        expect(mockIndex.fetch).toHaveBeenCalledWith({
                            ids: ['test-1'],
                            namespace: 'test-namespace'
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
