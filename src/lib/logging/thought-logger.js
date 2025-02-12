"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.thoughtLogger = exports.ThoughtLogger = void 0;
var event_emitter_1 = require("../events/event-emitter");
var ThoughtLogger = /** @class */ (function (_super) {
    __extends(ThoughtLogger, _super);
    function ThoughtLogger() {
        var _this = _super.call(this) || this;
        _this.thoughts = [];
        _this.listeners = new Set();
        _this.activeCollaborations = new Map();
        _this.activeTasks = new Map();
        _this.memoryUsage = 0;
        // Log initial startup
        _this.log('observation', 'System initialized');
        _this.startMemoryTracking();
        return _this;
    }
    ThoughtLogger.getInstance = function () {
        if (!ThoughtLogger.instance) {
            ThoughtLogger.instance = new ThoughtLogger();
        }
        return ThoughtLogger.instance;
    };
    ThoughtLogger.prototype.startMemoryTracking = function () {
        var _this = this;
        setInterval(function () {
            // Simulate memory tracking in browser environment
            _this.memoryUsage = _this.thoughts.reduce(function (total, thought) {
                return total + JSON.stringify(thought).length;
            }, 0);
        }, 5000);
    };
    ThoughtLogger.prototype.getMemoryUsage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.memoryUsage];
            });
        });
    };
    ThoughtLogger.prototype.log = function (level, message, metadata, options) {
        if (options === void 0) { options = {}; }
        var thought = __assign({ id: crypto.randomUUID(), level: level, message: message, timestamp: Date.now(), metadata: metadata }, options);
        // Track collaborations
        if (options.collaborationId) {
            var thoughts = this.activeCollaborations.get(options.collaborationId) || [];
            thoughts.push(thought.id);
            this.activeCollaborations.set(options.collaborationId, thoughts);
        }
        // Track tasks
        if (options.taskId) {
            var agents = this.activeTasks.get(options.taskId) || new Set();
            if (options.agentId) {
                agents.add(options.agentId);
            }
            this.activeTasks.set(options.taskId, agents);
        }
        this.thoughts.push(thought);
        this.notifyListeners();
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            var prefix = [
                options.agentId ? "[".concat(options.agentId, "]") : '',
                options.taskId ? "(Task ".concat(options.taskId, ")") : '',
                level.toUpperCase()
            ].filter(Boolean).join(' ');
            console.log("".concat(prefix, ": ").concat(message), metadata || '');
        }
    };
    ThoughtLogger.prototype.getThoughts = function (options) {
        if (options === void 0) { options = {}; }
        var filtered = __spreadArray([], this.thoughts, true);
        if (options.agentId) {
            filtered = filtered.filter(function (t) { return t.agentId === options.agentId; });
        }
        if (options.collaborationId) {
            filtered = filtered.filter(function (t) { return t.collaborationId === options.collaborationId; });
        }
        if (options.level) {
            filtered = filtered.filter(function (t) { return t.level === options.level; });
        }
        if (options.since) {
            filtered = filtered.filter(function (t) { return t.timestamp >= options.since; });
        }
        if (options.taskId) {
            filtered = filtered.filter(function (t) { return t.taskId === options.taskId; });
        }
        if (options.source) {
            filtered = filtered.filter(function (t) { return t.source === options.source; });
        }
        return filtered;
    };
    ThoughtLogger.prototype.subscribe = function (listener) {
        var _this = this;
        this.listeners.add(listener);
        listener(this.getThoughts());
        return function () {
            _this.listeners.delete(listener);
        };
    };
    ThoughtLogger.prototype.notifyListeners = function () {
        var thoughts = this.getThoughts();
        this.listeners.forEach(function (listener) { return listener(thoughts); });
    };
    ThoughtLogger.prototype.getThoughtTypes = function () {
        return {
            OBSERVATION: 'observation',
            REASONING: 'reasoning',
            PLAN: 'plan',
            DECISION: 'decision',
            CRITIQUE: 'critique',
            REFLECTION: 'reflection',
            EXECUTION: 'execution',
            SUCCESS: 'success',
            ERROR: 'error',
            AGENT_STATE: 'agent-state',
            AGENT_COMM: 'agent-comm',
            MEMORY_OP: 'memory-op',
            TASK_PLAN: 'task-plan'
        };
    };
    ThoughtLogger.prototype.clear = function () {
        this.thoughts = [];
        this.activeCollaborations.clear();
        this.activeTasks.clear();
        this.notifyListeners();
    };
    return ThoughtLogger;
}(event_emitter_1.EventEmitter));
exports.ThoughtLogger = ThoughtLogger;
exports.thoughtLogger = ThoughtLogger.getInstance();
