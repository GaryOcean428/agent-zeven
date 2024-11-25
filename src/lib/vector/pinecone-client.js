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
exports.pineconeClient = exports.PineconeClient = void 0;
var pinecone_1 = require("@pinecone-database/pinecone");
var thought_logger_1 = require("../logging/thought-logger");
var AppError_1 = require("../errors/AppError");
var config_1 = require("../config");
var rate_limiter_1 = require("../api/rate-limiter");
var PineconeClient = /** @class */ (function () {
    function PineconeClient() {
        this.client = null;
        this.initialized = false;
        this.rateLimiter = new rate_limiter_1.RateLimiter({
            maxRequests: 100,
            interval: 60 * 1000 // 1 minute
        });
        if (!config_1.config.apiKeys.pinecone) {
            thought_logger_1.thoughtLogger.log('warning', 'Pinecone API key not configured');
        }
    }
    PineconeClient.getInstance = function () {
        if (!PineconeClient.instance) {
            PineconeClient.instance = new PineconeClient();
        }
        return PineconeClient.instance;
    };
    PineconeClient.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.initialized)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!config_1.config.apiKeys.pinecone) {
                            throw new AppError_1.AppError('Pinecone API key not configured', 'CONFIG_ERROR');
                        }
                        this.client = new pinecone_1.Pinecone({
                            apiKey: config_1.config.apiKeys.pinecone,
                            environment: config_1.config.services.pinecone.host
                        });
                        this.index = this.client.index(config_1.config.services.pinecone.index);
                        // Verify connection
                        return [4 /*yield*/, this.index.describeIndexStats()];
                    case 2:
                        // Verify connection
                        _a.sent();
                        this.initialized = true;
                        thought_logger_1.thoughtLogger.log('success', 'Pinecone client initialized successfully');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to initialize Pinecone client', { error: error_1 });
                        throw new AppError_1.AppError('Pinecone initialization failed', 'PINECONE_ERROR', error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PineconeClient.prototype.upsert = function (vectors) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.rateLimiter.acquire()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.index.upsert(vectors)];
                    case 5:
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'Vectors upserted successfully', {
                            count: vectors.length
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Vector upsert failed', { error: error_2 });
                        throw new AppError_1.AppError('Vector upsert failed', 'PINECONE_ERROR', error_2);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PineconeClient.prototype.query = function (vector_1) {
        return __awaiter(this, arguments, void 0, function (vector, options) {
            var response, error_3;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.rateLimiter.acquire()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.index.query({
                                vector: vector,
                                topK: options.topK || 10,
                                filter: options.filter,
                                includeMetadata: options.includeMetadata
                            })];
                    case 5:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 6:
                        error_3 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Vector query failed', { error: error_3 });
                        throw new AppError_1.AppError('Vector query failed', 'PINECONE_ERROR', error_3);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PineconeClient.prototype.delete = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.rateLimiter.acquire()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.index.deleteMany(ids)];
                    case 5:
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'Vectors deleted successfully', {
                            count: ids.length
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Vector deletion failed', { error: error_4 });
                        throw new AppError_1.AppError('Vector deletion failed', 'PINECONE_ERROR', error_4);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PineconeClient.prototype.deleteAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.rateLimiter.acquire()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.index.deleteAll()];
                    case 5:
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'All vectors deleted successfully');
                        return [3 /*break*/, 7];
                    case 6:
                        error_5 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to delete all vectors', { error: error_5 });
                        throw new AppError_1.AppError('Failed to delete all vectors', 'PINECONE_ERROR', error_5);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PineconeClient.prototype.describeIndex = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stats, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.index.describeIndexStats()];
                    case 3:
                        stats = _a.sent();
                        return [2 /*return*/, {
                                dimension: config_1.config.services.pinecone.dimension,
                                indexFullness: stats.indexFullness || 0,
                                totalVectorCount: stats.totalVectorCount || 0
                            }];
                    case 4:
                        error_6 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to get index stats', { error: error_6 });
                        throw new AppError_1.AppError('Failed to get index stats', 'PINECONE_ERROR', error_6);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(PineconeClient.prototype, "isInitialized", {
        get: function () {
            return this.initialized;
        },
        enumerable: false,
        configurable: true
    });
    return PineconeClient;
}());
exports.PineconeClient = PineconeClient;
exports.pineconeClient = PineconeClient.getInstance();
