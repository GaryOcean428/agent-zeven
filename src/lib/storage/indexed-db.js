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
exports.IndexedDBStorage = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var AppError_1 = require("../errors/AppError");
var IndexedDBStorage = /** @class */ (function () {
    function IndexedDBStorage() {
        this.db = null;
        this.initialized = false;
        this.dbName = 'agent-one-db';
        this.version = 1;
        this.stores = {
            documents: 'documents',
            workspaces: 'workspaces',
            chats: 'chats',
            messages: 'messages',
            settings: 'settings',
            memory: 'memory'
        };
    }
    IndexedDBStorage.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.initialized)
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this.openDatabase()];
                    case 2:
                        _a.db = _b.sent();
                        this.initialized = true;
                        thought_logger_1.thoughtLogger.log('success', 'IndexedDB initialized successfully');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to initialize IndexedDB', { error: error_1 });
                        throw new AppError_1.AppError('Failed to initialize storage', 'STORAGE_ERROR', error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    IndexedDBStorage.prototype.openDatabase = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request = indexedDB.open(_this.dbName, _this.version);
            request.onerror = function () {
                reject(new AppError_1.AppError('Failed to open database', 'STORAGE_ERROR', request.error));
            };
            request.onsuccess = function () {
                resolve(request.result);
            };
            request.onupgradeneeded = function (event) {
                var db = request.result;
                // Create all required object stores if they don't exist
                Object.entries(_this.stores).forEach(function (_a) {
                    var key = _a[0], name = _a[1];
                    if (!db.objectStoreNames.contains(name)) {
                        var store = db.createObjectStore(name, { keyPath: 'id' });
                        // Add indexes based on store type
                        switch (name) {
                            case 'messages':
                                store.createIndex('chatId', 'chatId', { unique: false });
                                store.createIndex('timestamp', 'timestamp', { unique: false });
                                break;
                            case 'chats':
                                store.createIndex('timestamp', 'timestamp', { unique: false });
                                store.createIndex('title', 'title', { unique: false });
                                break;
                            case 'documents':
                                store.createIndex('workspaceId', 'workspaceId', { unique: false });
                                store.createIndex('timestamp', 'timestamp', { unique: false });
                                store.createIndex('tags', 'tags', { unique: false, multiEntry: true });
                                break;
                        }
                    }
                });
                thought_logger_1.thoughtLogger.log('success', 'Database schema updated');
            };
        });
    };
    IndexedDBStorage.prototype.put = function (storeName, value) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.db) {
                    throw new AppError_1.AppError('Database not initialized', 'STORAGE_ERROR');
                }
                if (!this.stores[storeName]) {
                    throw new AppError_1.AppError("Invalid store name: ".concat(storeName), 'STORAGE_ERROR');
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var transaction = _this.db.transaction(storeName, 'readwrite');
                        var store = transaction.objectStore(storeName);
                        var request = store.put(value);
                        request.onerror = function () {
                            reject(new AppError_1.AppError('Failed to store data', 'STORAGE_ERROR', request.error));
                        };
                        request.onsuccess = function () {
                            resolve();
                        };
                    })];
            });
        });
    };
    IndexedDBStorage.prototype.get = function (storeName, key) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.db) {
                    throw new AppError_1.AppError('Database not initialized', 'STORAGE_ERROR');
                }
                if (!this.stores[storeName]) {
                    throw new AppError_1.AppError("Invalid store name: ".concat(storeName), 'STORAGE_ERROR');
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var transaction = _this.db.transaction(storeName, 'readonly');
                        var store = transaction.objectStore(storeName);
                        var request = store.get(key);
                        request.onerror = function () {
                            reject(new AppError_1.AppError('Failed to retrieve data', 'STORAGE_ERROR', request.error));
                        };
                        request.onsuccess = function () {
                            resolve(request.result);
                        };
                    })];
            });
        });
    };
    IndexedDBStorage.prototype.getAll = function (storeName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.db) {
                    throw new AppError_1.AppError('Database not initialized', 'STORAGE_ERROR');
                }
                if (!this.stores[storeName]) {
                    throw new AppError_1.AppError("Invalid store name: ".concat(storeName), 'STORAGE_ERROR');
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var transaction = _this.db.transaction(storeName, 'readonly');
                        var store = transaction.objectStore(storeName);
                        var request = store.getAll();
                        request.onerror = function () {
                            reject(new AppError_1.AppError('Failed to retrieve data', 'STORAGE_ERROR', request.error));
                        };
                        request.onsuccess = function () {
                            resolve(request.result);
                        };
                    })];
            });
        });
    };
    IndexedDBStorage.prototype.delete = function (storeName, key) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.db) {
                    throw new AppError_1.AppError('Database not initialized', 'STORAGE_ERROR');
                }
                if (!this.stores[storeName]) {
                    throw new AppError_1.AppError("Invalid store name: ".concat(storeName), 'STORAGE_ERROR');
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var transaction = _this.db.transaction(storeName, 'readwrite');
                        var store = transaction.objectStore(storeName);
                        var request = store.delete(key);
                        request.onerror = function () {
                            reject(new AppError_1.AppError('Failed to delete data', 'STORAGE_ERROR', request.error));
                        };
                        request.onsuccess = function () {
                            resolve();
                        };
                    })];
            });
        });
    };
    IndexedDBStorage.prototype.clear = function (storeName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.db) {
                    throw new AppError_1.AppError('Database not initialized', 'STORAGE_ERROR');
                }
                if (!this.stores[storeName]) {
                    throw new AppError_1.AppError("Invalid store name: ".concat(storeName), 'STORAGE_ERROR');
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var transaction = _this.db.transaction(storeName, 'readwrite');
                        var store = transaction.objectStore(storeName);
                        var request = store.clear();
                        request.onerror = function () {
                            reject(new AppError_1.AppError('Failed to clear store', 'STORAGE_ERROR', request.error));
                        };
                        request.onsuccess = function () {
                            resolve();
                        };
                    })];
            });
        });
    };
    return IndexedDBStorage;
}());
exports.IndexedDBStorage = IndexedDBStorage;