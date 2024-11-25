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
exports.SwarmCoordinator = void 0;
var event_emitter_1 = require("../events/event-emitter");
var thought_logger_1 = require("../logging/thought-logger");
var router_1 = require("../routing/router");
var memory_aggregator_1 = require("../memory/memory-aggregator");
var SwarmCoordinator = /** @class */ (function (_super) {
    __extends(SwarmCoordinator, _super);
    function SwarmCoordinator() {
        var _this = _super.call(this) || this;
        _this.agents = new Map();
        _this.tasks = new Map(); // taskId -> agentIds
        _this.router = new router_1.ModelRouter();
        _this.memoryAggregator = memory_aggregator_1.MemoryAggregator.getInstance();
        return _this;
    }
    SwarmCoordinator.prototype.processTask = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var taskId, routerConfig, swarm, results, aggregatedContent, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        taskId = crypto.randomUUID();
                        thought_logger_1.thoughtLogger.log('plan', 'Starting swarm task processing', { taskId: taskId });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.router.route(message.content, [])];
                    case 2:
                        routerConfig = _a.sent();
                        swarm = this.createSwarm(message.content, routerConfig);
                        this.tasks.set(taskId, swarm.map(function (agent) { return agent.id; }));
                        return [4 /*yield*/, Promise.all(swarm.map(function (agent) { return _this.executeAgentTask(agent, message, taskId); }))];
                    case 3:
                        results = _a.sent();
                        return [4 /*yield*/, this.memoryAggregator.aggregateResults(results.map(function (r) { return ({
                                agentId: r.agentId,
                                content: r.content,
                                confidence: r.confidence
                            }); }))];
                    case 4:
                        aggregatedContent = _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'Swarm task completed', { taskId: taskId });
                        return [2 /*return*/, {
                                id: crypto.randomUUID(),
                                role: 'assistant',
                                content: aggregatedContent,
                                timestamp: Date.now()
                            }];
                    case 5:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Swarm task failed', { taskId: taskId, error: error_1 });
                        throw error_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SwarmCoordinator.prototype.createSwarm = function (task, config) {
        var swarm = [];
        // Add specialized agents based on task requirements
        if (task.toLowerCase().includes('search') || task.toLowerCase().includes('find')) {
            swarm.push(this.createAgent('search', ['web-search', 'data-gathering']));
        }
        if (task.toLowerCase().includes('analyze') || task.toLowerCase().includes('compare')) {
            swarm.push(this.createAgent('analysis', ['data-analysis', 'insight-generation']));
        }
        if (task.toLowerCase().includes('export') || task.toLowerCase().includes('table')) {
            swarm.push(this.createAgent('export', ['data-export', 'format-conversion']));
        }
        // Always add a coordinator agent
        swarm.push(this.createAgent('coordinator', ['task-coordination', 'result-synthesis']));
        return swarm;
    };
    SwarmCoordinator.prototype.createAgent = function (role, capabilities) {
        var agent = {
            id: crypto.randomUUID(),
            role: role,
            capabilities: new Set(capabilities),
            status: 'idle'
        };
        this.agents.set(agent.id, agent);
        return agent;
    };
    SwarmCoordinator.prototype.executeAgentTask = function (agent, message, taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('execution', "Agent ".concat(agent.id, " starting task"), {
                            role: agent.role,
                            taskId: taskId
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        agent.status = 'active';
                        return [4 /*yield*/, this.simulateAgentProcessing(agent, message)];
                    case 2:
                        result = _a.sent();
                        agent.status = 'idle';
                        return [2 /*return*/, {
                                agentId: agent.id,
                                content: result,
                                confidence: 0.9
                            }];
                    case 3:
                        error_2 = _a.sent();
                        agent.status = 'idle';
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SwarmCoordinator.prototype.simulateAgentProcessing = function (agent, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // This is a placeholder for actual agent-specific processing
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 1:
                        // This is a placeholder for actual agent-specific processing
                        _a.sent();
                        return [2 /*return*/, "".concat(agent.role, " processed: ").concat(message.content)];
                }
            });
        });
    };
    SwarmCoordinator.prototype.getActiveAgents = function () {
        return Array.from(this.agents.values()).filter(function (agent) { return agent.status === 'active'; });
    };
    SwarmCoordinator.prototype.getTaskAgents = function (taskId) {
        var _this = this;
        var agentIds = this.tasks.get(taskId) || [];
        return agentIds.map(function (id) { return _this.agents.get(id); }).filter(Boolean);
    };
    return SwarmCoordinator;
}(event_emitter_1.EventEmitter));
exports.SwarmCoordinator = SwarmCoordinator;
