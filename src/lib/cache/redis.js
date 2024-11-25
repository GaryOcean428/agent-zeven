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
exports.RedisCache = void 0;
var ioredis_1 = require("ioredis");
var thought_logger_1 = require("../logging/thought-logger");
var AppError_1 = require("../errors/AppError");
var RedisCache = /** @class */ (function () {
    function RedisCache() {
        this.initialized = false;
        this.client = new ioredis_1.default({
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT || '6379'),
            password: process.env.REDIS_PASSWORD,
            db: parseInt(process.env.REDIS_DB || '0'),
            retryStrategy: function (times) {
                var delay = Math.min(times * 50, 2000);
                return delay;
            }
        });
        this.client.on('error', function (error) {
            thought_logger_1.thoughtLogger.log('error', 'Redis error', { error: error });
        });
    }
    RedisCache.getInstance = function () {
        if (!RedisCache.instance) {
            RedisCache.instance = new RedisCache();
        }
        return RedisCache.instance;
    };
    RedisCache.prototype.initialize = function () {
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
                        return [4 /*yield*/, this.client.ping()];
                    case 2:
                        _a.sent();
                        this.initialized = true;
                        thought_logger_1.thoughtLogger.log('success', 'Redis connection initialized');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to initialize Redis connection', { error: error_1 });
                        throw new AppError_1.AppError('Cache initialization failed', 'CACHE_ERROR', error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisCache.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var value, error_2;
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
                        return [4 /*yield*/, this.client.get(key)];
                    case 3:
                        value = _a.sent();
                        return [2 /*return*/, value ? JSON.parse(value) : null];
                    case 4:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Cache get failed', { key: key, error: error_2 });
                        throw new AppError_1.AppError('Cache get failed', 'CACHE_ERROR', error_2);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RedisCache.prototype.set = function (key, value, ttl) {
        return __awaiter(this, void 0, void 0, function () {
            var serialized, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        serialized = JSON.stringify(value);
                        if (!ttl) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.client.set(key, serialized, 'EX', ttl)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.client.set(key, serialized)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_3 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Cache set failed', { key: key, error: error_3 });
                        throw new AppError_1.AppError('Cache set failed', 'CACHE_ERROR', error_3);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    RedisCache.prototype.delete = function (key) {
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
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.client.del(key)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Cache delete failed', { key: key, error: error_4 });
                        throw new AppError_1.AppError('Cache delete failed', 'CACHE_ERROR', error_4);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RedisCache.prototype.clear = function () {
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
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.client.flushdb()];
                    case 3:
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'Cache cleared');
                        return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Cache clear failed', { error: error_5 });
                        throw new AppError_1.AppError('Cache clear failed', 'CACHE_ERROR', error_5);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RedisCache.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.quit()];
                    case 1:
                        _a.sent();
                        this.initialized = false;
                        thought_logger_1.thoughtLogger.log('success', 'Redis connection closed');
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(RedisCache.prototype, "isInitialized", {
        get: function () {
            return this.initialized;
        },
        enumerable: false,
        configurable: true
    });
    return RedisCache;
}());
exports.RedisCache = RedisCache;
