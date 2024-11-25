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
exports.cacheManager = exports.CacheManager = void 0;
var storage_client_1 = require("./storage-client");
var thought_logger_1 = require("../logging/thought-logger");
var AppError_1 = require("../errors/AppError");
var CacheManager = /** @class */ (function () {
    function CacheManager() {
        this.initialized = false;
        this.storage = storage_client_1.StorageClient.getInstance();
        this.memoryCache = new Map();
    }
    CacheManager.getInstance = function () {
        if (!CacheManager.instance) {
            CacheManager.instance = new CacheManager();
        }
        return CacheManager.instance;
    };
    CacheManager.prototype.initialize = function () {
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
                        return [4 /*yield*/, this.storage.initialize()];
                    case 2:
                        _a.sent();
                        this.initialized = true;
                        thought_logger_1.thoughtLogger.log('success', 'Cache manager initialized');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to initialize cache manager', { error: error_1 });
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CacheManager.prototype.getFullKey = function (key, namespace) {
        return namespace ? "".concat(namespace, ":").concat(key) : key;
    };
    CacheManager.prototype.get = function (key_1) {
        return __awaiter(this, arguments, void 0, function (key, options) {
            var fullKey, memoryItem, value, error_2;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fullKey = this.getFullKey(key, options.namespace);
                        memoryItem = this.memoryCache.get(fullKey);
                        if (memoryItem) {
                            if (Date.now() < memoryItem.expires) {
                                return [2 /*return*/, memoryItem.value];
                            }
                            this.memoryCache.delete(fullKey);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.storage.get(fullKey)];
                    case 2:
                        value = _a.sent();
                        if (value) {
                            // Update memory cache
                            this.memoryCache.set(fullKey, {
                                value: value,
                                expires: Date.now() + (options.ttl || 300) * 1000
                            });
                        }
                        return [2 /*return*/, value];
                    case 3:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Cache get failed', { key: fullKey, error: error_2 });
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CacheManager.prototype.set = function (key_1, value_1) {
        return __awaiter(this, arguments, void 0, function (key, value, options) {
            var fullKey, ttl, error_3;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fullKey = this.getFullKey(key, options.namespace);
                        ttl = options.ttl || 300;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // Set in persistent storage
                        return [4 /*yield*/, this.storage.set(fullKey, value, ttl)];
                    case 2:
                        // Set in persistent storage
                        _a.sent();
                        // Update memory cache
                        this.memoryCache.set(fullKey, {
                            value: value,
                            expires: Date.now() + ttl * 1000
                        });
                        // Clean up expired memory cache entries
                        this.cleanMemoryCache();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Cache set failed', { key: fullKey, error: error_3 });
                        throw new AppError_1.AppError('Failed to set cache value', 'CACHE_ERROR', error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CacheManager.prototype.delete = function (key, namespace) {
        return __awaiter(this, void 0, void 0, function () {
            var fullKey, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fullKey = this.getFullKey(key, namespace);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.storage.delete(fullKey)];
                    case 2:
                        _a.sent();
                        this.memoryCache.delete(fullKey);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Cache delete failed', { key: fullKey, error: error_4 });
                        throw new AppError_1.AppError('Failed to delete cache value', 'CACHE_ERROR', error_4);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CacheManager.prototype.clear = function (namespace) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, key, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        if (!namespace) return [3 /*break*/, 2];
                        // Clear storage keys by namespace
                        return [4 /*yield*/, this.storage.clear()];
                    case 1:
                        // Clear storage keys by namespace
                        _b.sent();
                        // Clear memory cache for namespace
                        for (_i = 0, _a = this.memoryCache.keys(); _i < _a.length; _i++) {
                            key = _a[_i];
                            if (key.startsWith(namespace)) {
                                this.memoryCache.delete(key);
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.storage.clear()];
                    case 3:
                        _b.sent();
                        this.memoryCache.clear();
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_5 = _b.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Cache clear failed', { namespace: namespace, error: error_5 });
                        throw new AppError_1.AppError('Failed to clear cache', 'CACHE_ERROR', error_5);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CacheManager.prototype.cleanMemoryCache = function () {
        var now = Date.now();
        for (var _i = 0, _a = this.memoryCache.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], item = _b[1];
            if (now >= item.expires) {
                this.memoryCache.delete(key);
            }
        }
    };
    Object.defineProperty(CacheManager.prototype, "isInitialized", {
        get: function () {
            return this.initialized;
        },
        enumerable: false,
        configurable: true
    });
    return CacheManager;
}());
exports.CacheManager = CacheManager;
exports.cacheManager = CacheManager.getInstance();
