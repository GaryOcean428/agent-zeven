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
exports.SystemInitializer = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var code_awareness_1 = require("./code-awareness");
var agent_system_1 = require("../agents/agent-system");
var router_1 = require("../routing/router");
var memory_manager_1 = require("../memory/memory-manager");
var postgres_1 = require("../db/postgres");
var redis_1 = require("../cache/redis");
var SystemInitializer = /** @class */ (function () {
    function SystemInitializer() {
        this.initialized = false;
    }
    SystemInitializer.getInstance = function () {
        if (!SystemInitializer.instance) {
            SystemInitializer.instance = new SystemInitializer();
        }
        return SystemInitializer.instance;
    };
    SystemInitializer.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var codeAwareness, _a, modelRouter, memoryManager, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.initialized)
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        thought_logger_1.thoughtLogger.log('plan', 'Starting system initialization');
                        // Initialize storage systems with fallbacks
                        return [4 /*yield*/, this.initializeStorage()];
                    case 2:
                        // Initialize storage systems with fallbacks
                        _b.sent();
                        codeAwareness = code_awareness_1.CodeAwareness.getInstance();
                        return [4 /*yield*/, codeAwareness.initialize()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, Promise.all([
                                router_1.ModelRouter.getInstance().initialize(),
                                memory_manager_1.MemoryManager.getInstance().initialize()
                            ])];
                    case 4:
                        _a = _b.sent(), modelRouter = _a[0], memoryManager = _a[1];
                        // Initialize agent system
                        return [4 /*yield*/, agent_system_1.agentSystem.initialize()];
                    case 5:
                        // Initialize agent system
                        _b.sent();
                        this.initialized = true;
                        thought_logger_1.thoughtLogger.log('success', 'System initialization complete', {
                            codeAwareness: codeAwareness.isInitialized,
                            modelRouter: modelRouter.isInitialized,
                            memoryManager: memoryManager.isInitialized,
                            agentSystem: agent_system_1.agentSystem.isInitialized
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        thought_logger_1.thoughtLogger.log('error', 'System initialization failed', { error: error_1 });
                        // Don't rethrow - allow system to function with reduced capabilities
                        this.initialized = true;
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SystemInitializer.prototype.initializeStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, cache, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        if (!process.env.POSTGRES_HOST) return [3 /*break*/, 2];
                        db = postgres_1.PostgresClient.getInstance();
                        return [4 /*yield*/, db.initialize()];
                    case 1:
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'PostgreSQL initialized');
                        return [3 /*break*/, 3];
                    case 2:
                        thought_logger_1.thoughtLogger.log('warning', 'PostgreSQL not configured, using in-memory storage');
                        _a.label = 3;
                    case 3:
                        if (!process.env.REDIS_HOST) return [3 /*break*/, 5];
                        cache = redis_1.RedisCache.getInstance();
                        return [4 /*yield*/, cache.initialize()];
                    case 4:
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'Redis initialized');
                        return [3 /*break*/, 6];
                    case 5:
                        thought_logger_1.thoughtLogger.log('warning', 'Redis not configured, using in-memory cache');
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('warning', 'Storage initialization failed, using fallbacks', { error: error_2 });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(SystemInitializer.prototype, "isInitialized", {
        get: function () {
            return this.initialized;
        },
        enumerable: false,
        configurable: true
    });
    return SystemInitializer;
}());
exports.SystemInitializer = SystemInitializer;
