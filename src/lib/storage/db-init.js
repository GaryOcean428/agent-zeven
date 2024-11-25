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
exports.dbInitializer = exports.DBInitializer = void 0;
var db_config_1 = require("./db-config");
var thought_logger_1 = require("../logging/thought-logger");
var DBInitializer = /** @class */ (function () {
    function DBInitializer() {
        this.db = null;
        this.initPromise = null;
    }
    DBInitializer.getInstance = function () {
        if (!DBInitializer.instance) {
            DBInitializer.instance = new DBInitializer();
        }
        return DBInitializer.instance;
    };
    DBInitializer.prototype.initDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.initPromise) {
                    return [2 /*return*/, this.initPromise];
                }
                this.initPromise = new Promise(function (resolve, reject) {
                    var openRequest = indexedDB.open(db_config_1.DBConfig.DB_NAME, db_config_1.DBConfig.DB_VERSION);
                    openRequest.onerror = function () {
                        thought_logger_1.thoughtLogger.log('error', 'Failed to open database', { error: openRequest.error });
                        reject(openRequest.error);
                    };
                    openRequest.onsuccess = function () {
                        _this.db = openRequest.result;
                        thought_logger_1.thoughtLogger.log('success', 'Database opened successfully');
                        resolve(_this.db);
                    };
                    openRequest.onupgradeneeded = function (event) {
                        thought_logger_1.thoughtLogger.log('execution', 'Database upgrade needed, creating stores');
                        var db = openRequest.result;
                        _this.createObjectStores(db);
                    };
                });
                return [2 /*return*/, this.initPromise];
            });
        });
    };
    DBInitializer.prototype.createObjectStores = function (db) {
        // Messages store
        if (!db.objectStoreNames.contains(db_config_1.DBConfig.STORES.MESSAGES)) {
            var messagesStore = db.createObjectStore(db_config_1.DBConfig.STORES.MESSAGES, { keyPath: 'id' });
            messagesStore.createIndex('chatId', 'chatId');
            messagesStore.createIndex('timestamp', 'timestamp');
            thought_logger_1.thoughtLogger.log('success', 'Created messages store');
        }
        // Memory store
        if (!db.objectStoreNames.contains(db_config_1.DBConfig.STORES.MEMORY)) {
            var memoryStore = db.createObjectStore(db_config_1.DBConfig.STORES.MEMORY, { keyPath: 'id' });
            memoryStore.createIndex('timestamp', 'timestamp');
            memoryStore.createIndex('type', 'type');
            thought_logger_1.thoughtLogger.log('success', 'Created memory store');
        }
        // User store
        if (!db.objectStoreNames.contains(db_config_1.DBConfig.STORES.USER)) {
            db.createObjectStore(db_config_1.DBConfig.STORES.USER, { keyPath: 'id' });
            thought_logger_1.thoughtLogger.log('success', 'Created user store');
        }
        // Settings store
        if (!db.objectStoreNames.contains(db_config_1.DBConfig.STORES.SETTINGS)) {
            db.createObjectStore(db_config_1.DBConfig.STORES.SETTINGS, { keyPath: 'id' });
            thought_logger_1.thoughtLogger.log('success', 'Created settings store');
        }
        // Chats store
        if (!db.objectStoreNames.contains(db_config_1.DBConfig.STORES.CHATS)) {
            var chatsStore = db.createObjectStore(db_config_1.DBConfig.STORES.CHATS, { keyPath: 'id' });
            chatsStore.createIndex('timestamp', 'timestamp');
            chatsStore.createIndex('title', 'title');
            thought_logger_1.thoughtLogger.log('success', 'Created chats store');
        }
        // Workflows store
        if (!db.objectStoreNames.contains(db_config_1.DBConfig.STORES.WORKFLOWS)) {
            var workflowsStore = db.createObjectStore(db_config_1.DBConfig.STORES.WORKFLOWS, { keyPath: 'id' });
            workflowsStore.createIndex('timestamp', 'timestamp');
            workflowsStore.createIndex('name', 'name');
            thought_logger_1.thoughtLogger.log('success', 'Created workflows store');
        }
    };
    DBInitializer.prototype.getDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.db) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.initDatabase()];
                    case 1:
                        _a.db = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.db];
                }
            });
        });
    };
    DBInitializer.prototype.closeDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.db) {
                    this.db.close();
                    this.db = null;
                    this.initPromise = null;
                    thought_logger_1.thoughtLogger.log('success', 'Database connection closed');
                }
                return [2 /*return*/];
            });
        });
    };
    return DBInitializer;
}());
exports.DBInitializer = DBInitializer;
exports.dbInitializer = DBInitializer.getInstance();
