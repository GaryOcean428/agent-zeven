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
exports.dbClient = exports.DBClient = void 0;
var idb_1 = require("idb");
var thought_logger_1 = require("../logging/thought-logger");
var DBClient = /** @class */ (function () {
    function DBClient() {
        this.db = null;
        this.initialized = false;
        this.initPromise = null;
    }
    DBClient.getInstance = function () {
        if (!DBClient.instance) {
            DBClient.instance = new DBClient();
        }
        return DBClient.instance;
    };
    DBClient.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.initialized)
                    return [2 /*return*/];
                if (this.initPromise)
                    return [2 /*return*/, this.initPromise];
                this.initPromise = (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, error_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, 3, 4]);
                                _a = this;
                                return [4 /*yield*/, (0, idb_1.openDB)('gary8-db', 1, {
                                        upgrade: function (db) {
                                            // Messages store
                                            if (!db.objectStoreNames.contains('messages')) {
                                                var messagesStore = db.createObjectStore('messages', { keyPath: 'id' });
                                                messagesStore.createIndex('by-timestamp', 'timestamp');
                                            }
                                            // Vectors store
                                            if (!db.objectStoreNames.contains('vectors')) {
                                                db.createObjectStore('vectors', { keyPath: 'id' });
                                            }
                                        },
                                        blocking: function () {
                                            // Handle blocked events (e.g., when an older version is still open)
                                            thought_logger_1.thoughtLogger.log('warning', 'Database blocked by older version');
                                        },
                                        terminated: function () {
                                            // Handle unexpected database termination
                                            thought_logger_1.thoughtLogger.log('error', 'Database connection terminated unexpectedly');
                                            this.initialized = false;
                                            this.db = null;
                                        }
                                    })];
                            case 1:
                                _a.db = _b.sent();
                                this.initialized = true;
                                thought_logger_1.thoughtLogger.log('success', 'Database initialized');
                                return [3 /*break*/, 4];
                            case 2:
                                error_1 = _b.sent();
                                thought_logger_1.thoughtLogger.log('error', 'Failed to initialize database', { error: error_1 });
                                this.initialized = false;
                                this.db = null;
                                throw error_1;
                            case 3:
                                this.initPromise = null;
                                return [7 /*endfinally*/];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })();
                return [2 /*return*/, this.initPromise];
            });
        });
    };
    DBClient.prototype.query = function (storeName, method, key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, store, result, _a, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!this.db) {
                            throw new Error('Database not initialized');
                        }
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 14, , 15]);
                        tx = this.db.transaction(storeName, method === 'get' || method === 'getAll' ? 'readonly' : 'readwrite');
                        store = tx.objectStore(storeName);
                        result = void 0;
                        _a = method;
                        switch (_a) {
                            case 'get': return [3 /*break*/, 4];
                            case 'getAll': return [3 /*break*/, 6];
                            case 'put': return [3 /*break*/, 8];
                            case 'delete': return [3 /*break*/, 10];
                        }
                        return [3 /*break*/, 12];
                    case 4: return [4 /*yield*/, store.get(key)];
                    case 5:
                        result = _b.sent();
                        return [3 /*break*/, 12];
                    case 6: return [4 /*yield*/, store.getAll()];
                    case 7:
                        result = _b.sent();
                        return [3 /*break*/, 12];
                    case 8: return [4 /*yield*/, store.put(value)];
                    case 9:
                        result = _b.sent();
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, store.delete(key)];
                    case 11:
                        result = _b.sent();
                        return [3 /*break*/, 12];
                    case 12: return [4 /*yield*/, tx.done];
                    case 13:
                        _b.sent();
                        return [2 /*return*/, result];
                    case 14:
                        error_2 = _b.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Query failed', { error: error_2, method: method, storeName: storeName });
                        throw error_2;
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(DBClient.prototype, "isInitialized", {
        get: function () {
            return this.initialized;
        },
        enumerable: false,
        configurable: true
    });
    return DBClient;
}());
exports.DBClient = DBClient;
exports.dbClient = DBClient.getInstance();
