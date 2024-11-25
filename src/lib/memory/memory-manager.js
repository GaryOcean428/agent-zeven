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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryManager = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var MemoryManager = /** @class */ (function () {
    function MemoryManager() {
        this.initialized = false;
        this.messages = [];
        this.maxMessages = 1000;
    }
    MemoryManager.getInstance = function () {
        if (!MemoryManager.instance) {
            MemoryManager.instance = new MemoryManager();
        }
        return MemoryManager.instance;
    };
    MemoryManager.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.initialized)
                    return [2 /*return*/];
                try {
                    // Initialize with in-memory storage
                    this.initialized = true;
                    thought_logger_1.thoughtLogger.log('success', 'Memory manager initialized with in-memory storage');
                }
                catch (error) {
                    thought_logger_1.thoughtLogger.log('error', 'Failed to initialize memory manager', { error: error });
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    MemoryManager.prototype.storeMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        try {
                            this.messages.push(message);
                            // Keep only recent messages
                            if (this.messages.length > this.maxMessages) {
                                this.messages = this.messages.slice(-this.maxMessages);
                            }
                            thought_logger_1.thoughtLogger.log('success', 'Message stored successfully', {
                                messageId: message.id
                            });
                        }
                        catch (error) {
                            thought_logger_1.thoughtLogger.log('error', 'Failed to store message', { error: error });
                            throw error;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MemoryManager.prototype.getRelevantContext = function (query_1) {
        return __awaiter(this, arguments, void 0, function (query, limit) {
            var scored;
            var _this = this;
            if (limit === void 0) { limit = 5; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        try {
                            scored = this.messages.map(function (message) { return ({
                                message: message,
                                score: _this.calculateSimilarity(query, message.content)
                            }); });
                            // Sort by score and return top matches
                            return [2 /*return*/, scored
                                    .sort(function (a, b) { return b.score - a.score; })
                                    .slice(0, limit)
                                    .map(function (item) { return item.message; })];
                        }
                        catch (error) {
                            thought_logger_1.thoughtLogger.log('error', 'Failed to get relevant context', { error: error });
                            throw error;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MemoryManager.prototype.calculateSimilarity = function (a, b) {
        var wordsA = new Set(a.toLowerCase().split(/\s+/));
        var wordsB = new Set(b.toLowerCase().split(/\s+/));
        var intersection = new Set(Array.from(wordsA).filter(function (word) { return wordsB.has(word); }));
        var union = new Set(__spreadArray(__spreadArray([], wordsA, true), wordsB, true));
        return intersection.size / union.size;
    };
    MemoryManager.prototype.clearMemory = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.messages = [];
                    thought_logger_1.thoughtLogger.log('success', 'Memory cleared successfully');
                }
                catch (error) {
                    thought_logger_1.thoughtLogger.log('error', 'Failed to clear memory', { error: error });
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(MemoryManager.prototype, "isInitialized", {
        get: function () {
            return this.initialized;
        },
        enumerable: false,
        configurable: true
    });
    return MemoryManager;
}());
exports.MemoryManager = MemoryManager;
