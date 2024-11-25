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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAgent = void 0;
var event_emitter_1 = require("../../events/event-emitter");
var message_queue_1 = require("./message-queue");
var BaseAgent = /** @class */ (function (_super) {
    __extends(BaseAgent, _super);
    function BaseAgent(config) {
        var _this = _super.call(this) || this;
        _this.subordinates = new Map();
        _this.config = config;
        _this.messageQueue = new message_queue_1.MessageQueue();
        _this.state = {
            id: config.id,
            status: 'idle',
            subordinates: [],
            lastActive: Date.now(),
            metrics: {
                tasksCompleted: 0,
                successRate: 1,
                averageResponseTime: 0
            }
        };
        return _this;
    }
    BaseAgent.prototype.sendMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var fullMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fullMessage = __assign(__assign({}, message), { id: crypto.randomUUID(), timestamp: Date.now() });
                        return [4 /*yield*/, this.messageQueue.enqueue(fullMessage)];
                    case 1:
                        _a.sent();
                        this.emit('message-sent', fullMessage);
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseAgent.prototype.addSubordinate = function (agent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.subordinates.set(agent.getId(), agent);
                this.state.subordinates.push(agent.getId());
                this.emit('subordinate-added', agent.getId());
                return [2 /*return*/];
            });
        });
    };
    BaseAgent.prototype.removeSubordinate = function (agentId) {
        return __awaiter(this, void 0, void 0, function () {
            var agent;
            return __generator(this, function (_a) {
                agent = this.subordinates.get(agentId);
                if (agent) {
                    this.subordinates.delete(agentId);
                    this.state.subordinates = this.state.subordinates.filter(function (id) { return id !== agentId; });
                    this.emit('subordinate-removed', agentId);
                }
                return [2 /*return*/];
            });
        });
    };
    BaseAgent.prototype.setStatus = function (status) {
        this.state.status = status;
        this.state.lastActive = Date.now();
        this.emit('status-changed', status);
    };
    BaseAgent.prototype.getId = function () {
        return this.config.id;
    };
    BaseAgent.prototype.getRole = function () {
        return this.config.role;
    };
    BaseAgent.prototype.getState = function () {
        return __assign({}, this.state);
    };
    BaseAgent.prototype.getSubordinates = function () {
        return Array.from(this.subordinates.values());
    };
    BaseAgent.prototype.delegateTask = function (task, targetAgentId) {
        return __awaiter(this, void 0, void 0, function () {
            var agent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        agent = this.subordinates.get(targetAgentId);
                        if (!agent) {
                            throw new Error("Agent ".concat(targetAgentId, " not found"));
                        }
                        return [4 /*yield*/, this.sendMessage({
                                from: this.config.id,
                                to: targetAgentId,
                                content: task,
                                type: 'command'
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseAgent.prototype.updateMetrics = function (success, responseTime) {
        var metrics = this.state.metrics;
        metrics.tasksCompleted++;
        metrics.successRate = (metrics.successRate * (metrics.tasksCompleted - 1) + (success ? 1 : 0)) / metrics.tasksCompleted;
        metrics.averageResponseTime = (metrics.averageResponseTime * (metrics.tasksCompleted - 1) + responseTime) / metrics.tasksCompleted;
    };
    return BaseAgent;
}(event_emitter_1.EventEmitter));
exports.BaseAgent = BaseAgent;
