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
exports.ContextManager = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var vector_memory_1 = require("../memory/vector-memory");
var ContextManager = /** @class */ (function () {
    function ContextManager() {
        this.contextWindows = new Map();
        this.maxWindowSize = 10;
        this.vectorMemory = new vector_memory_1.VectorMemory();
    }
    ContextManager.getInstance = function () {
        if (!ContextManager.instance) {
            ContextManager.instance = new ContextManager();
        }
        return ContextManager.instance;
    };
    ContextManager.prototype.getContext = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var memories, recentContext, context, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('execution', 'Retrieving context for message');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.vectorMemory.recall(message.content)];
                    case 2:
                        memories = _a.sent();
                        recentContext = this.getRecentContext(message);
                        context = __spreadArray(__spreadArray([], memories.map(function (m) { return "[Memory] ".concat(m.content); }), true), recentContext.map(function (m) { return "[Recent] ".concat(m.role, ": ").concat(m.content); }), true).join('\n\n');
                        thought_logger_1.thoughtLogger.log('success', 'Context retrieved successfully', {
                            memoriesFound: memories.length,
                            recentContextSize: recentContext.length
                        });
                        return [2 /*return*/, context];
                    case 3:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to retrieve context', { error: error_1 });
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ContextManager.prototype.updateContext = function (windowId, message, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var window;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        window = this.contextWindows.get(windowId) || {
                            messages: [],
                            metadata: {},
                            timestamp: Date.now()
                        };
                        // Add message to window
                        window.messages.push(message);
                        // Update metadata
                        if (metadata) {
                            window.metadata = __assign(__assign({}, window.metadata), metadata);
                        }
                        // Trim window if needed
                        if (window.messages.length > this.maxWindowSize) {
                            window.messages = window.messages.slice(-this.maxWindowSize);
                        }
                        this.contextWindows.set(windowId, window);
                        // Store in vector memory for long-term recall
                        return [4 /*yield*/, this.vectorMemory.store(message.content, 'message')];
                    case 1:
                        // Store in vector memory for long-term recall
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContextManager.prototype.getRecentContext = function (message) {
        // Find most relevant context window
        var relevantWindow;
        var highestSimilarity = -1;
        for (var _i = 0, _a = this.contextWindows.values(); _i < _a.length; _i++) {
            var window_1 = _a[_i];
            var similarity = this.calculateContextSimilarity(message, window_1);
            if (similarity > highestSimilarity) {
                highestSimilarity = similarity;
                relevantWindow = window_1;
            }
        }
        return (relevantWindow === null || relevantWindow === void 0 ? void 0 : relevantWindow.messages) || [];
    };
    ContextManager.prototype.calculateContextSimilarity = function (message, window) {
        // Simple keyword-based similarity for demonstration
        // In production, use proper embedding similarity
        var messageWords = new Set(message.content.toLowerCase().split(/\s+/));
        var windowWords = new Set(window.messages
            .map(function (m) { return m.content.toLowerCase(); })
            .join(' ')
            .split(/\s+/));
        var intersection = new Set(Array.from(messageWords).filter(function (word) { return windowWords.has(word); }));
        return intersection.size / Math.max(messageWords.size, windowWords.size);
    };
    ContextManager.prototype.clearContext = function (windowId) {
        this.contextWindows.delete(windowId);
    };
    ContextManager.prototype.getContextWindowCount = function () {
        return this.contextWindows.size;
    };
    return ContextManager;
}());
exports.ContextManager = ContextManager;
