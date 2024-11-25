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
exports.memory = exports.Memory = void 0;
var idb_1 = require("idb");
var Memory = /** @class */ (function () {
    function Memory() {
        this.shortTermMemory = [];
        this.maxShortTermSize = 100;
        this.db = null;
        this.dbInitialized = false;
        this.initDB().catch(console.error);
    }
    Memory.prototype.initDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.dbInitialized)
                            return [2 /*return*/];
                        _a = this;
                        return [4 /*yield*/, (0, idb_1.openDB)('agent-memory', 1, {
                                upgrade: function (db) {
                                    // Create stores if they don't exist
                                    if (!db.objectStoreNames.contains('long-term')) {
                                        db.createObjectStore('long-term', { keyPath: 'id' });
                                    }
                                    if (!db.objectStoreNames.contains('user-info')) {
                                        db.createObjectStore('user-info', { keyPath: 'key' });
                                    }
                                },
                            })];
                    case 1:
                        _a.db = _b.sent();
                        this.dbInitialized = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Memory.prototype.store = function (message, response) {
        return __awaiter(this, void 0, void 0, function () {
            var content, name_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Add to short-term memory
                        this.shortTermMemory.push(message);
                        this.shortTermMemory.push(response);
                        if (this.shortTermMemory.length > this.maxShortTermSize) {
                            this.shortTermMemory.shift();
                        }
                        if (!(message.role === 'user')) return [3 /*break*/, 2];
                        content = message.content.toLowerCase();
                        if (!(content.includes('my name is') || content.includes('i am called'))) return [3 /*break*/, 2];
                        name_1 = this.extractName(content);
                        if (!name_1) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.storeUserInfo('name', name_1)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Memory.prototype.extractName = function (content) {
        var namePatterns = [
            /my name is (\w+)/i,
            /i am called (\w+)/i,
            /i'm (\w+)/i,
            /call me (\w+)/i
        ];
        for (var _i = 0, namePatterns_1 = namePatterns; _i < namePatterns_1.length; _i++) {
            var pattern = namePatterns_1[_i];
            var match = content.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        return null;
    };
    Memory.prototype.storeUserInfo = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, store, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initDB()];
                    case 1:
                        _a.sent();
                        if (!this.db)
                            return [2 /*return*/];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        tx = this.db.transaction('user-info', 'readwrite');
                        store = tx.objectStore('user-info');
                        return [4 /*yield*/, store.put({
                                key: key,
                                value: value,
                                timestamp: Date.now()
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, tx.done];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.error('Error storing user info:', error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Memory.prototype.getUserInfo = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var info, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initDB()];
                    case 1:
                        _a.sent();
                        if (!this.db)
                            return [2 /*return*/, null];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.db.get('user-info', key)];
                    case 3:
                        info = _a.sent();
                        return [2 /*return*/, (info === null || info === void 0 ? void 0 : info.value) || null];
                    case 4:
                        error_2 = _a.sent();
                        console.error('Error getting user info:', error_2);
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Memory.prototype.getRelevantMemories = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var userName, userContext, recentMessages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initDB()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getUserInfo('name')];
                    case 2:
                        userName = _a.sent();
                        userContext = userName ? "User's name is ".concat(userName, ".") : '';
                        recentMessages = this.shortTermMemory
                            .slice(-5)
                            .map(function (msg) { return "".concat(msg.role, ": ").concat(msg.content); })
                            .join('\n');
                        // Combine all context
                        return [2 /*return*/, [userContext, recentMessages]
                                .filter(Boolean)
                                .join('\n\n')];
                }
            });
        });
    };
    Memory.prototype.getRecentMessages = function (count) {
        if (count === void 0) { count = 10; }
        return this.shortTermMemory.slice(-count);
    };
    Memory.prototype.clearShortTermMemory = function () {
        this.shortTermMemory = [];
    };
    return Memory;
}());
exports.Memory = Memory;
exports.memory = new Memory();
